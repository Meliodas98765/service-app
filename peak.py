# from flask import Flask, request, render_template
from quart import Quart, request, render_template
from SDKInitialize import SDKInitializer
from Functions import get_records, update_records
from scraper import run_scraper
import asyncio, os, subprocess, json, datetime, logging
from dotenv import load_dotenv

load_dotenv()
app = Quart(__name__)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


node = os.getenv("NODE")
task_semaphore = asyncio.Semaphore(1)  # Allow only one task at a time
request_queue = asyncio.Queue()
is_task_running = False
# create 

@app.route('/live') 
async def server_live():
    return "Hii from Server!!", 200
@app.route('/fetch_data_test', methods=["POST","GET"]) 
async def fetch_data_test():
    """
    params : 
        page - page no
        batch_id - id of the batch
    """
    if request.method == "GET":
        return "Hii There from server!!"
    if request.method == 'POST':
        # Get JSON data from the POST request
        request_data = await request.get_json()
        print(request_data['page'])
        print(request_data['batch_id'])
        task = asyncio.create_task(execute_test())
        return {
            "page":request_data['page'],
            "batch_d":request_data['batch_id']
        }, 200
    
@app.route('/fetch_data', methods=["POST"]) 
async def fetch_data():
    """
    params : 
        page - page no
        batch_id - id of the batch
    """
    if request.method == 'POST':
        # Get JSON data from the POST request

        request_data = await request.get_json()
        print(request_data['page'])

        task_status = await check_tasks()

        if task_status:
            return {
                "status":200,
                "message":"Job already running.."
            }, 200
        else:
            task_created = await create_task(request_data)
            if task_created:
                return {
                    "status":200,
                    "message":"Job initiated successfully"
                }, 200
            else:
                return {
                    "status":500,
                    "message":"Failed initiating job. Please try again"
                }, 200

async def check_tasks():
    return is_task_running

async def create_task(request_data):
    global is_task_running
    if is_task_running:
        return False  # Task already running

    async with task_semaphore:
        # Check if there are pending requests in the queue
        if not request_queue.empty():
            return False  # Block task creation for same type of request

        is_task_running = True
        asyncio.create_task(start_flow(request_data))
        return True

async def execute_test():
    asyncio.sleep(1)
    print("Test executed!!")

async def start_flow(request_data):
    global is_task_running
    """
    Initialize SDK
    getRecords for 'page'
    set/change proxy and burner account
    call scrapper
    update Records
    """
    asyncio.sleep(5) # handover to fetch_data to respond

    sdk = SDKInitializer()
    sdk.initialize()
    print("SDK Initiated")
    logging.info("SDK Initialized")
    # Update to log
    update_status(request_data['batch_id'],str(datetime.datetime.now())+"-SDK Initiated","INPROGRESS")

    # Fetch Records 
    module_name = "Linkedin_Module_Demo"
    records = get_records(module_name,request_data['page']) # returns 100 latest records sorted in desc by URL
    print (records)
    logging.info(records)
    print("RECORDS Fetched")
    logging.info("RECORDS Fetched")
    # Update to log
    update_status(request_data['batch_id'],str(datetime.datetime.now())+"-RECORDS Fetched","INPROGRESS")

    # Set/ Update proxy
    # Start Scrapper
    await start_scrapper(records,request_data['batch_id'])
    # await start_scrapper(records,request_data['batch_id'])
    print("PROFILES Fetched")
    logging.info("PROFILES Fetched")
    # Update to log
    update_status(request_data['batch_id'],str(datetime.datetime.now())+"-PROFILES Fetched","INPROGRESS")

    # Update to CRM
    update_to_crm(records,module_name)
    print("PROFILES Updated")
    logging.info("PROFILES Updated")
    # Update to log
    update_status(request_data['batch_id'],str(datetime.datetime.now())+"-PROFILES Updated","COMPLETED")
    is_task_running = False

def update_status(batch_id,log,status):
    print("BATCH_ID : "+batch_id + "\n LOG : " + log + "\n STATUS : " +status )
    if not os.path.exists("status.json"):
        # Create an empty JSON object if the file doesn't exist
        status_data = {"batch_list": {}}
    else:
        # Read the existing JSON data from the file
        with open("status.json","r+") as file:
            try:
                status_data = json.load(file)
            except json.JSONDecodeError:
                status_data = {"batch_list": {}}
            
    status_data["batch_list"].setdefault(batch_id, {"logs": [], "status": ""})
    status_data["batch_list"][batch_id]["logs"].append(log)
    if status_data["batch_list"][batch_id]["status"] != status:
        status_data["batch_list"][batch_id]["status"] = status

    with open("status.json", "w") as file:
        json.dump(status_data, file, indent=2)


async def start_scrapper(records,batch_id):
    url_list = []
    for record in records["record_lsit"]:
        url_list.append(record.get_key_value("Name"))
    print(url_list)
    # async def run_scraper_async(url_list):
    await run_scraper(url_list,batch_id)

    # await run_scraper_async(url_list)

    # execute driver.js
    js_cmd = ["sudo",node,"driver.js"]
    subprocess.run(js_cmd,check =True)
    return "Scrape Completed"

def update_to_crm(records,module_name):
    with open("sources/profiles.json","r") as f:
        profile_list = json.load(f)
    for i in range(len(profile_list)):
        prf = profile_list[i]
        
        for rec in records["record_lsit"]:
            # print(prf["url"].rstrip() + "   " + rec.get_key_value("Name").rstrip())
            if (rec.get_key_value("Name").rstrip("/") == prf["url"].rstrip("/")):
                profile_list[i]["id"] = rec.get_key_value("id")
                # print(profile_list[i])
    # print(profile_list)
    # TODO log for each record updated and what was updated
    print(update_records(module_name,profile_list))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

### SINGLE FLOW ###

# sdk = SDKInitializer()
# sdk.initialize()
# module_name = "Linkedin_Module"
# # GET Records 
# records = get_records(module_name)
# print(records)
# url_list = []
# for record in records["record_lsit"]:
#     url_list.append(record.get_key_value("Name"))
# # print(url_list)
# # asyncio.get_event_loop().run_until_complete(run_scraper(url_list))
# # execute driver.js
# js_cmd = ["node","driver.js"]
# subprocess.run(js_cmd,check =True)
# print("Data Fetched!!!")
# # UPDATE Records
# # profile_list = [{
# #     "id":414778000001969014,
# #     "name": "Priya Thavare",
# #     "title": "Key Account Manager at Zoho | Software Engineer | Project Planning | Sales Operations | Business Development | Client Management | Vendor Support | Negotiation | Business-to-Business (B2B) | Sales Presentations",
# #     "talksAbout": "",
# #     "location": "Mumbai, Maharashtra, India ",
# #     "about": "",
# #     "url": "https://www.linkedin.com/in/priyathavare",
# #     "experiences": [
# #         {
# #             "role": "Key Accounts and Large Business Manager",
# #             "companyName": "Zoho · Full-time",
# #             "period": "Aug 2023 - Present · 8 mos",
# #             "location": "Mumbai, Maharashtra, India · On-site"
# #         },
# #         {
# #             "role": "Project Manager",
# #             "companyName": "BYJU'S · Full-time",
# #             "period": "Apr 2018 - Jul 2023 · 5 yrs 4 mos",
# #             "location": "Bengaluru, Karnataka, India"
# #         },
# #         {
# #             "role": "Developer",
# #             "companyName": "BINALBINE TECHNOLOGIES LLP · Full-time",
# #             "period": "Sep 2016 - Apr 2018 · 1 yr 8 mos",
# #             "location": "Pune, Maharashtra, India"
# #         }
# #     ],
# #     "skills": [
# #         "Account Management",
# #         "Business-to-Business (B2B)"
# #     ],
# #     "followers": "",
# #     "connections": "221",
# #     "email": "",
# #     "phone": "",
# #     "birthDate": "",
# #     "img_url": ""
# # }]
# with open("sources/profiles.json","r") as f:
#     profile_list = json.load(f)
# for i in range(len(profile_list)):
#     prf = profile_list[i]
    
#     for rec in records["record_lsit"]:
#         # print(prf["url"].rstrip() + "   " + rec.get_key_value("Name").rstrip())
#         if (rec.get_key_value("Name").rstrip("/") == prf["url"].rstrip("/")):
#             profile_list[i]["id"] = rec.get_key_value("id")
#             # print(profile_list[i])
# # print(profile_list)

# print(update_records(module_name,profile_list))
