---
name: crawl4ai
description: "Use when crawling websites, scraping pages, or extracting structured data using LLMs/CSS selectors."
category: "scraping"
risk: "safe"
source: "community"
date_added: "2026-05-20"
tags: ["crawler", "scraper", "scraping", "llm-crawling", "litellm", "playwright", "markdown-extraction"]
tools: ["claude", "cursor", "gemini"]
---

# Crawl4AI Skill

Crawl4AI is an open-source, LLM-friendly web crawler and scraper designed to turn dynamic web pages into clean, structured Markdown, JSON, and LLM-ready content.

## When to Use

- When you need to crawl or scrape web pages and retrieve data optimized for LLM processing.
- When you need structured data extraction (JSON) using Pydantic schemas or CSS selectors.
- When crawling dynamic pages containing client-side JavaScript or requiring dynamic interactions (scrolling, clicking).
- When bypassing basic bot detection using stealth mode, proxy rotation, and custom browser settings.

## Core Capabilities

- **LLM-Friendly Markdown:** Auto-generates clean, structured markdown containing citations, tables, and links.
- **Structured LLM Extraction:** Integrates with LiteLLM (`LLMExtractionStrategy`) to extract JSON content directly based on Pydantic schemas.
- **CSS & XPath Extraction:** Provides high-speed schema extraction (`JsonCssExtractionStrategy`) using CSS selectors without LLM costs.
- **Dynamic Interactions:** Supports user scripts, custom headers, viewport adjustments, and custom wait times.
- **Session Management:** Saves cookies, user states, and authentication contexts to traverse pages requiring logins.
- **Advanced Caching:** Uses file-system-based caching (`CacheMode`) to speed up subsequent requests.

## How It Works

### 1. Basic Async Crawling
Create an instance of `AsyncWebCrawler` and fetch a page as markdown:

```python
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://example.com")
        print(result.markdown)

if __name__ == "__main__":
    asyncio.run(main())
```

### 2. Browser and Crawl Configurations
Customize crawling behavior using `BrowserConfig` and `CrawlerRunConfig`:

```python
import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

async def main():
    browser_config = BrowserConfig(
        headless=True,
        verbose=True,
    )
    run_config = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        css_selector="main.content",  # Limit crawl to specific elements
        word_count_threshold=10,
    )
    async with AsyncWebCrawler(config=browser_config) as crawler:
        result = await crawler.arun(url="https://example.com", config=run_config)
        print(result.markdown)

if __name__ == "__main__":
    asyncio.run(main())
```

### 3. LLM-Driven Schema Extraction
Extract structured data into Pydantic models automatically:

```python
import os
import asyncio
from pydantic import BaseModel, Field
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMExtractionStrategy, LLMConfig

class Product(BaseModel):
    name: str = Field(..., description="Product name")
    price: str = Field(..., description="Product price")

async def main():
    llm_strategy = LLMExtractionStrategy(
        llm_config=LLMConfig(provider="openai/gpt-4o", api_token=os.getenv("OPENAI_API_KEY")),
        schema=Product.schema(),
        extraction_type="schema",
        instruction="Extract all products and prices from the page content.",
    )
    run_config = CrawlerRunConfig(
        extraction_strategy=llm_strategy,
        cache_mode=CacheMode.BYPASS,
    )
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://example.com/store", config=run_config)
        print(result.extracted_content)

if __name__ == "__main__":
    asyncio.run(main())
```

### 4. CSS Selector JSON Extraction
Extract repetitive patterns using CSS selectors without invoking an LLM:

```python
import asyncio
import json
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, JsonCssExtractionStrategy

async def main():
    schema = {
        "name": "Article Links",
        "baseSelector": "article.post",
        "fields": [
            {"name": "title", "selector": "h2", "type": "text"},
            {"name": "link", "selector": "a", "type": "attribute", "attribute": "href"},
        ]
    }
    
    run_config = CrawlerRunConfig(
        extraction_strategy=JsonCssExtractionStrategy(schema),
        cache_mode=CacheMode.BYPASS,
    )
    
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://example.com/blog", config=run_config)
        articles = json.loads(result.extracted_content)
        print(articles)

if __name__ == "__main__":
    asyncio.run(main())
```

## Common Mistakes

- **autoblocking/CAPTCHAs:** Crawling sites with strong anti-scraping without enabling stealth features. Ensure proxies or persistence contexts are enabled.
- **Sync/Async conflicts:** Mixing synchronous browser calls inside the `AsyncWebCrawler` async lifecycle. Use `arun()` and standard async patterns.
- **Overlooking Caching:** Forgetting to bypass caching (`CacheMode.BYPASS`) when dynamic updates are needed on a page, causing the scraper to load stale local content.
- **Litellm Dependency Issues:** Version `v0.8.5` and earlier might have issues with litellm dependency. Use `pip install -U crawl4ai` to get `v0.8.6+` which resolves dependencies.
