/**
 * Script to programmatically create the Hackathon Submission page in Notion.
 *
 * Requirements:
 * 1. An Internal Integration Secret from https://www.notion.so/my-integrations
 * 2. The Page ID of the parent page (from the page's Notion URL)
 * 3. Grant the integration access to the parent page via Notion (••• -> Connections -> Add Connection)
 *
 * Usage:
 *   node scripts/create_notion_page.js <NOTION_API_KEY> <PARENT_PAGE_ID>
 */

const fs = require('fs');
const path = require('path');

const apiKey = process.argv[2] || process.env.NOTION_API_KEY;
const parentPageId = process.argv[3] || process.env.NOTION_PAGE_ID;

if (!apiKey || !parentPageId) {
  console.log(`
Usage:
  node scripts/create_notion_page.js <NOTION_API_KEY> <PARENT_PAGE_ID>

Example:
  node scripts/create_notion_page.js secret_abc123xyz 1234567890abcdef1234567890abcdef
`);
  process.exit(1);
}

// Clean parent page ID (strip dashes if any, then re-format or use directly)
const cleanParentId = parentPageId.replace(/-/g, '');

const pageData = {
  parent: { page_id: cleanParentId },
  icon: { type: 'emoji', emoji: '🚧' },
  cover: {
    type: 'external',
    external: {
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80',
    },
  },
  properties: {
    title: {
      title: [
        {
          type: 'text',
          text: { content: 'Civic AI Assistant — Team HEXCELERATE (Hacktober HackDays 2026)' },
        },
      ],
    },
  },
  children: [
    // 1. Callout Block
    {
      object: 'block',
      type: 'callout',
      callout: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'Team Name: HEXCELERATE\nHackathon: Hacktober HackDays (by SheBuilds Delhi Chapter, powered by MLH)\nProject Title: Civic AI Assistant: Smart Urban Grievance & Infrastructure Verifier\nGitHub: https://github.com/sameerpacer1/Civic_AI_Assistance',
            },
          },
        ],
        icon: { type: 'emoji', emoji: '💡' },
        color: 'gray_background',
      },
    },
    { object: 'block', type: 'divider', divider: {} },

    // 2. Problem Statement & Solution Brief
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '1. Problem Statement & Solution Brief' } }],
      },
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ type: 'text', text: { content: '📌 Problem Statement' } }],
      },
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'Current municipal complaint portals face major challenges because officials waste hours manually checking fake or blurry photo reports, and there is no automatic system to separate dangerous road emergencies like deep potholes from minor complaints. Furthermore, large smartphone photos load very slowly on weak internet connections and accidentally expose bystanders\' faces on public tracking dashboards, creating serious privacy concerns for citizens.',
            },
          },
        ],
      },
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ type: 'text', text: { content: '💡 Solution Brief' } }],
      },
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                'Civic AI Assistant is an open-source web application built with Next.js and powered by Cloudinary that automatically verifies, protects, and optimizes civic complaints in real time.',
            },
          },
        ],
      },
    },
    { object: 'block', type: 'divider', divider: {} },

    // 3. How We Used Cloudinary
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '2. How We Used Cloudinary (Mandatory Core Engine)' } }],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            annotations: { bold: true },
            text: { content: 'AI Issue Verification (auto_tagging): ' },
          },
          {
            type: 'text',
            text: {
              content:
                'Scans uploaded photos for civic damage indicators (potholes, road fractures, garbage, water leaks) and automatically assigns priority badges (HIGH PRIORITY for Potholes/Water Leaks, MEDIUM PRIORITY for Garbage/Streetlights).',
            },
          },
        ],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            annotations: { bold: true },
            text: { content: 'Citizen Privacy Shield (e_pixelate_faces:15): ' },
          },
          {
            type: 'text',
            text: {
              content:
                'Uses dynamic Cloudinary URL transformations to blur human faces in public reports automatically, complying with privacy standards and DPDP/GDPR regulations.',
            },
          },
        ],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            annotations: { bold: true },
            text: { content: 'Low-Bandwidth Optimization (f_auto, q_auto:eco): ' },
          },
          {
            type: 'text',
            text: {
              content:
                'Compresses heavy smartphone uploads by up to 80%-90% into modern WebP/AVIF formats so municipal dashboards load fast even on spotty 4G/5G mobile networks.',
            },
          },
        ],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          {
            type: 'text',
            annotations: { bold: true },
            text: { content: 'Smart Thumbnails (c_fill, g_auto): ' },
          },
          {
            type: 'text',
            text: {
              content:
                'Auto-crops around the main focal point of damage for clean, informative card previews on municipal operator dashboards.',
            },
          },
        ],
      },
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'javascript',
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                '// app/api/upload/route.js - Cloudinary Upload Stream & Transformations\nconst uploadResult = await new Promise((resolve, reject) => {\n  const stream = cloudinary.uploader.upload_stream(\n    {\n      folder: "civic-ai-assistant",\n      tags: [category, "civic-report", "hacktober-2026", "team-hexcelerate"],\n      resource_type: "image",\n    },\n    (error, result) => error ? reject(error) : resolve(result)\n  );\n  stream.end(buffer);\n});\n\n// Transformed URLs for Citizen Privacy & High Compression\nconst redactedOptimizedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/e_pixelate_faces:15,f_auto,q_auto:eco,w_1000,c_limit/${publicId}`;\nconst thumbnailUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_400,h_300,c_fill,g_auto,f_auto,q_auto/${publicId}`;',
            },
          },
        ],
      },
    },
    { object: 'block', type: 'divider', divider: {} },

    // 4. System Architecture & Tech Stack
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '3. System Architecture & Tech Stack' } }],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', annotations: { bold: true }, text: { content: 'Frontend: ' } },
          { type: 'text', text: { content: 'Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, Canvas Confetti' } },
        ],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', annotations: { bold: true }, text: { content: 'Backend: ' } },
          { type: 'text', text: { content: 'Next.js Serverless API Route (/api/upload)' } },
        ],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', annotations: { bold: true }, text: { content: 'Media & AI Pipeline: ' } },
          { type: 'text', text: { content: 'Official Cloudinary Node.js SDK (cloudinary.v2)' } },
        ],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', annotations: { bold: true }, text: { content: 'Documentation: ' } },
          { type: 'text', text: { content: 'Notion & GitHub README' } },
        ],
      },
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            annotations: { bold: true },
            text: { content: 'Workflow: ' },
          },
          {
            type: 'text',
            text: {
              content:
                'Citizen Photo Upload ──► Cloudinary AI & Transformation Pipeline (e_pixelate_faces, f_auto, q_auto) ──► Automated Severity Triage (MCD / DJB / Noida SLA) ──► Public Municipal Dashboard with Upvote Escalations.',
            },
          },
        ],
      },
    },
    { object: 'block', type: 'divider', divider: {} },

    // 5. Our Building Journey
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '4. Our Building Journey (Day-by-Day Log)' } }],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', annotations: { bold: true }, text: { content: 'Phase 1 (23 Oct 2026 - Registration & Ideation): ' } },
          { type: 'text', text: { content: 'Registered as Team HEXCELERATE for Hacktober HackDays (by SheBuilds Delhi Chapter, powered by MLH). Identified civic reporting bottlenecks in Delhi NCR and architected the Cloudinary media pipeline.' } },
        ],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', annotations: { bold: true }, text: { content: 'Phase 2 (Core Development): ' } },
          { type: 'text', text: { content: 'Built the Next.js frontend and /api/upload route integrating Cloudinary upload streams, face pixelation, and auto-optimization. Created quick test presets for judges.' } },
        ],
      },
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', annotations: { bold: true }, text: { content: 'Phase 3 (Testing & Polish): ' } },
          { type: 'text', text: { content: 'Added side-by-side comparison cards (Raw vs. Cloudinary Redacted/Optimized), fallback demo resilience, completed Notion documentation, and pushed to GitHub.' } },
        ],
      },
    },
    { object: 'block', type: 'divider', divider: {} },

    // 6. Local Setup & Installation Guide
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '5. Local Setup & Installation Guide' } }],
      },
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'bash',
        rich_text: [
          {
            type: 'text',
            text: {
              content:
                '# 1. Clone repository\ngit clone https://github.com/sameerpacer1/Civic_AI_Assistance.git\ncd Civic_AI_Assistance\n\n# 2. Install dependencies\nnpm install\n\n# 3. Setup .env.local\nNEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tz0a0d6t\nCLOUDINARY_CLOUD_NAME=tz0a0d6t\nCLOUDINARY_API_KEY=382169972458679\nCLOUDINARY_API_SECRET=y9iWz7t6dthBo7UXnkZznsqF6FU\n\n# 4. Start local development server\nnpm run dev\n# App ready at http://localhost:3000',
            },
          },
        ],
      },
    },
  ],
};

async function createNotionPage() {
  console.log('Connecting to Notion API...');
  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageData),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Notion API Error:', data);
      process.exit(1);
    }

    console.log('SUCCESS! Notion page created.');
    console.log('Page URL:', data.url);
    console.log('Page ID:', data.id);
  } catch (err) {
    console.error('Request failed:', err);
    process.exit(1);
  }
}

createNotionPage();

