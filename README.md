# sunlongyu.github.io

Personal blog website built with Hugo and the CleanWhite theme.

## Project Structure

```
├── .gitignore                # Git ignore file
├── README.md                 # Project documentation
├── config.toml              # Hugo configuration
├── content/                 # Blog content (Markdown files)
│   ├── about/              # About pages
│   ├── archive/            # Archive page
│   ├── notes/              # Notes section
│   ├── post/               # Blog posts
│   └── search/             # Search functionality
├── static/                  # Static assets
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   ├── img/                # Images
│   └── mdimg/              # Markdown images
├── themes/                  # Hugo themes
│   └── hugo-theme-cleanwhite/
├── archetypes/             # Content templates
├── scripts/                # Build and deployment scripts
│   ├── deploy.sh          # Deployment script
│   └── build_algolia_index.sh  # Search index builder
└── public/                 # Generated site (ignored by git)
```

## Development

### Prerequisites
- Hugo (extended version recommended)
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/sunlongyu/sunlongyu.github.io.git
cd sunlongyu.github.io

# Start the development server
hugo server -D

# Build the site
hugo
```

### Deployment
```bash
# Run the deployment script
./scripts/deploy.sh
```

## Features
- Clean and responsive design
- Blog posts with categories and tags
- Search functionality (Algolia)
- Social media integration
- Reward system (WeChat Pay & Alipay)
- Multi-language support
