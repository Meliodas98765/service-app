import asyncio, os, random, logging
from pyppeteer import launch
from pyppeteer_stealth import stealth
from pyppeteer.browser import Browser
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')
exec_path = os.getenv("CHROME_DRIVER")
user_email = os.getenv("USER_EMAILID")
passkey = os.getenv("PASSKEY")
# Batch of 10 reads and change proxy
async def run_scraper(url_list,batch_id):
    logging.info("Starting Scraper")
    browser = await launch({
            'headless': True,
            'executablePath': exec_path,
            'args': ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--enable-logging', '--v=1', '--log-file=chrome.log'],
        },
        handleSIGINT=False,
        handleSIGTERM=False,
        handleSIGHUP=False
        )
    logging.info("Browser Initiated")
    page = await browser.newPage()
    logging.info("Browser Open New Page")
    await stealth(page)
    await page.goto('https://www.linkedin.com/login')
    logging.info("Browser Open Login Page")
    await page.type('div.form__input--floating input#username', user_email)
    await page.type('div.form__input--floating input#password', passkey)
    await page.click('div.login__form_action_container > button', waitUntil='networkidle0')
    logging.info("Sign In Successfull")
    await asyncio.sleep(random.uniform(5, 15))

    for go_to_url in url_list:

    # go_to_url = "https://www.linkedin.com/in/theharishnarayanan/"
        print(go_to_url)
        logging.info("working on this ",go_to_url)
        file_path = "sources/"+go_to_url.split("https://www.linkedin.com/in/")[1].replace("/","") + ".html"
        if not os.path.exists(file_path):  # Temporary
            await page.goto(go_to_url)
            logging.info(go_to_url, "opened")
            await asyncio.sleep(random.uniform(15, 35))

            page_source = await page.content()

            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(page_source)
        else: # Temporary
            print(f"File {file_path} already exists. Skipping writing page content.")
            logging.info(f"File {file_path} already exists. Skipping writing page content.")
        await asyncio.sleep(random.uniform(20, 60))

    await browser.close()  # Close the browser
    
    # except Exception as be:
    #     if browser is not None:
    #         browser.close()
    #     return -1

    # try:
    #     update_status(batch_id,"Launching Browser..","DESCRIPTION")
    #     browser = await launch({
    #         'headless': True,
    #         'args': ['--no-sandbox'],
    #     })
    #     print("Launch Successful")
    #     update_status(batch_id,"Launch Successful","DESCRIPTION")
    #     try:
    #         await execute_url_scrapping(url_list,batch_id,browser)
    #     except Exception as e:
    #         update_status(batch_id,"Scrapping Failed","FAILED")
    # except RuntimeError as e:
    #     update_status(batch_id,"Failed in sandbox mode","FAILED")
    #     if (str(e) == "Event loop is closed"):
    #         # inside server env
    #         update_status(batch_id,"Launching Browser in Production env..","DESCRIPTION")
    #         browser = await launch({
    #             'headless': True,
    #             'args': ['--no-sandbox'],
    #         })
    #         try:
    #             await execute_url_scrapping(url_list,batch_id,browser)
    #         except Exception as e:
    #             update_status(batch_id,"Scrapping Failed","FAILED")
    # except Exception as e:
    #     if ("Browser closed unexpectedly" in str(e)):
    #         update_status(batch_id,"Failed launching Browser","FAILED")
    #         # could be due to sandbox check prod mode
    #         # inside server env
    #         update_status(batch_id,"Launching Browser in Production env..","DESCRIPTION")
    #         browser = await launch({
    #             'headless': True,
    #             'args': ['--no-sandbox'],
    #         })
    #         try:
    #             await execute_url_scrapping(url_list,batch_id,browser)
    #         except Exception as e:
    #             update_status(batch_id,"Scrapping Failed","FAILED")


async def execute_url_scrapping(url_list,batch_id,browser):
    update_status(batch_id,"Launch Successful!!","DESCRIPTION")
    page = await browser.newPage()

    await stealth(page)
    await page.goto('https://www.linkedin.com/login')

    await page.type('div.form__input--floating input#username', 'pandasidharthjitendra@gmail.com')
    await page.type('div.form__input--floating input#password', 'Meliodas#1')
    await page.click('div.login__form_action_container > button', waitUntil='networkidle0')

    await asyncio.sleep(random.uniform(5, 15))
    
    for go_to_url in url_list:

    # go_to_url = "https://www.linkedin.com/in/theharishnarayanan/"
        print(go_to_url)
        logging.info("Working on ",go_to_url)
        file_path = "sources/"+go_to_url.split("https://www.linkedin.com/in/")[1].replace("/","") + ".html"
        if not os.path.exists(file_path):  # Temporary
            await page.goto(go_to_url)
            logging.info(go_to_url, " opened")
            await asyncio.sleep(random.uniform(15, 35))

            page_source = await page.content()

            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(page_source)
        else: # Temporary
            print(f"File {file_path} already exists. Skipping writing page content.")
            logging.info(f"File {file_path} already exists. Skipping writing page content.")
        await asyncio.sleep(random.uniform(20, 60))
    browser.close()

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
    if status == "DESCRIPTION":

        status_data["batch_list"][batch_id]["logs"].append(status +" - "+ log)
    else:
        status_data["batch_list"][batch_id]["logs"].append(status +" - "+ log)
        if status_data["batch_list"][batch_id]["status"] != status:
            status_data["batch_list"][batch_id]["status"] = status

    with open("status.json", "w") as file:
        json.dump(status_data, file, indent=2)

# asyncio.get_event_loop().run_until_complete(run_scraper())
