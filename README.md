# Island Drains & Excavation Website

A professional website for Island Drains & Excavation, a drainage and excavation service company serving Vancouver Island, British Columbia.

## Overview

This website showcases Island Drains & Excavation's expertise in drainage and excavation services, highlighting their services, specialties, and company information. The website is designed to be responsive, modern, and user-friendly.

## Features

- Responsive design that works on desktop, tablet, and mobile devices
- Modern and professional UI with smooth animations
- Sections for services, about us, specialties, and contact information
- Contact form for potential clients to reach out
- Mobile-friendly navigation with hamburger menu

## File Structure

```
IslandDrainsWebsite/
├── css/
│   └── styles.css
├── images/
│   └── (placeholder for company images)
├── js/
│   └── main.js
├── index.html
└── README.md
```

## Getting Started

To view the website locally:

1. Clone this repository
2. Open `index.html` in your web browser

## Customization

### Adding Images

To add images to the website:

1. Place your image files in the `images/` directory
2. Update the image paths in the HTML files as needed
3. Recommended images to add:
   - Logo image
   - Hero background image (suggested size: 1920x1080px)
   - About section image (team or company photo)
   - Service icons or images

### Updating Content

To update the website content:

1. Open `index.html` in a text editor
2. Modify the text content as needed
3. Save the file and refresh your browser to see the changes

### Modifying Styles

To change the website's appearance:

1. Open `css/styles.css` in a text editor
2. Modify the CSS variables at the top of the file to change colors:
   ```css
   :root {
       --primary-color: #1a5276; /* Deep blue */
       --secondary-color: #f39c12; /* Orange/gold */
       --accent-color: #2ecc71; /* Green */
       --dark-color: #2c3e50; /* Dark blue/slate */
       --light-color: #ecf0f1; /* Light gray */
       /* ... other variables ... */
   }
   ```
3. Save the file and refresh your browser to see the changes

## Deployment

To deploy the website to a live server:

1. Upload all files to your web hosting provider
2. Ensure the file structure is maintained
3. Point your domain to the directory containing these files

## Contact Form

The contact form currently uses client-side JavaScript to handle submissions. To make it functional:

1. Set up a server-side script to process form submissions
2. Update the form action in `index.html` to point to your server-side script
3. Configure the script to send emails or store submissions in a database

## Browser Compatibility

This website is compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
