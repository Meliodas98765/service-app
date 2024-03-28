import asyncio, os, random
from pyppeteer import launch
from pyppeteer_stealth import stealth
from pyppeteer.browser import Browser

# Batch of 10 reads and change proxy
async def run_scraper(url_list):

    browser = await launch({
        'headless': True,
    })
    page = await browser.newPage()

    await stealth(page)
    await page.goto('https://www.linkedin.com/login')

    await page.type('div.form__input--floating input#username', 'mintu.test98@gmail.com')
    await page.type('div.form__input--floating input#password', 'Qwertyasdf#221')
    await page.click('div.login__form_action_container > button', waitUntil='networkidle0')

    await asyncio.sleep(random.uniform(5, 15))
    
    for go_to_url in url_list:

    # go_to_url = "https://www.linkedin.com/in/theharishnarayanan/"
        # print(go_to_url)
        file_path = "sources/"+go_to_url.split("https://www.linkedin.com/in/")[1].replace("/","") + ".html"
        if not os.path.exists(file_path):  # Temporary
            await page.goto(go_to_url)

            await asyncio.sleep(random.uniform(15, 35))

            page_source = await page.content()

            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(page_source)
        else: # Temporary
            print(f"File {file_path} already exists. Skipping writing page content.")

        await asyncio.sleep(random.uniform(20, 60))

    await browser.close()  # Close the browser

# asyncio.get_event_loop().run_until_complete(run_scraper())