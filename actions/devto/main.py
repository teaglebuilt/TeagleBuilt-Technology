import os
import requests
import logging
import json

logger = logging.getLogger(__name__)


class DEVGateway:
    url = "https://dev.to/api"

    def __init__(self):
        self.session = requests.Session()
        self.session.headers = {"api-key": os.environ["DEV_API_KEY"]}

    def get_articles(self):
        """Get all the published articles."""
        response = self.session.get(
            f"{self.url}/articles/me/", params={"per_page": 1000}
        )
        response.raise_for_status()
        return response.json()



def main():
    dev_gateway = DEVGateway()
    articles = dev_gateway.get_articles()
    logger.info(articles)



if __name__ == "__main__":
    logging.basicConfig(
        format="%(levelname)s: %(message)s", level=logging.INFO, stream=sys.stdout
    )
    main()