export interface TemplateTask {
	id: number;
	name: string;
	blockedBy: number[];
}

export interface Template {
	name: string;
	tasks: TemplateTask[];
}

export const TEMPLATES: Template[] = [
	{
		name: 'Planning a vacation',
		tasks: [
			{
				id: 1,
				name: 'Research vacation destinations',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Choose destination',
				blockedBy: [1]
			},
			{
				id: 3,
				name: 'Create a vacation budget',
				blockedBy: [2]
			},
			{
				id: 4,
				name: 'Research transportation methods to destination',
				blockedBy: [2]
			},
			{
				id: 5,
				name: 'Book transportation tickets',
				blockedBy: [3, 4]
			},
			{
				id: 6,
				name: 'Research local transportation',
				blockedBy: [2]
			},
			{
				id: 7,
				name: 'Reserve accommodations',
				blockedBy: [2, 3]
			},
			{
				id: 8,
				name: 'Research required vaccinations',
				blockedBy: [2]
			},
			{
				id: 9,
				name: 'Get necessary vaccinations',
				blockedBy: [8]
			},
			{
				id: 10,
				name: 'Research travel insurance',
				blockedBy: [2]
			},
			{
				id: 11,
				name: 'Purchase travel insurance',
				blockedBy: [3, 10]
			},
			{
				id: 12,
				name: 'Learn useful phrases in destination language',
				blockedBy: [2]
			},
			{
				id: 13,
				name: 'Create wishlist for attractions',
				blockedBy: [2]
			},
			{
				id: 14,
				name: 'Research travelling clothes',
				blockedBy: [2]
			},
			{
				id: 15,
				name: 'Research travelling gear',
				blockedBy: [2]
			},
			{
				id: 16,
				name: 'Purchase necessary clothing and gear',
				blockedBy: [3, 14, 15]
			},
			{
				id: 17,
				name: 'Create detailed itinerary',
				blockedBy: [5, 6, 7, 13]
			},
			{
				id: 18,
				name: 'Share itinerary with emergency contacts',
				blockedBy: [17]
			},
			{
				id: 19,
				name: 'Pack luggage',
				blockedBy: [16, 17]
			}
		]
	},
	{
		name: 'Creating a personal brand',
		tasks: [
			{
				id: 1,
				name: 'Define brand purpose and values',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Research target audience',
				blockedBy: []
			},
			{
				id: 3,
				name: 'Analyze competitors',
				blockedBy: []
			},
			{
				id: 4,
				name: 'Write elevator pitch',
				blockedBy: [1, 2]
			},
			{
				id: 5,
				name: 'Create brand positioning statement',
				blockedBy: [1, 2, 3, 4]
			},
			{
				id: 6,
				name: 'Design personal logo',
				blockedBy: [1]
			},
			{
				id: 7,
				name: 'Select brand colors and typography',
				blockedBy: [1]
			},
			{
				id: 8,
				name: 'Create style guide',
				blockedBy: [6, 7]
			},
			{
				id: 9,
				name: 'Get a professional portrait taken',
				blockedBy: [7]
			},
			{
				id: 10,
				name: 'Design resume',
				blockedBy: [8]
			},
			{
				id: 11,
				name: 'Design cover letter template',
				blockedBy: [8]
			},
			{
				id: 12,
				name: 'Create business cards',
				blockedBy: [6, 8, 9]
			},
			{
				id: 13,
				name: 'Create email signature',
				blockedBy: [6, 8]
			},
			{
				id: 14,
				name: 'Set up LinkedIn profile',
				blockedBy: [4, 5, 9]
			},
			{
				id: 15,
				name: 'Design social banners',
				blockedBy: [8]
			},
			{
				id: 16,
				name: 'Create bio templates',
				blockedBy: [4, 5]
			},
			{
				id: 17,
				name: 'Set up portfolio website',
				blockedBy: [8, 9]
			},
			{
				id: 18,
				name: 'Create project showcase',
				blockedBy: [17]
			},
			{
				id: 19,
				name: 'Design presentation template',
				blockedBy: [8]
			},
			{
				id: 20,
				name: 'Design pitch deck',
				blockedBy: [8, 19]
			},
			{
				id: 21,
				name: 'Create a case study',
				blockedBy: [8, 17]
			},
			{
				id: 22,
				name: 'Set up testimonial system',
				blockedBy: [17]
			},
			{
				id: 23,
				name: 'Create media kit',
				blockedBy: [6, 8, 9, 16]
			},
			{
				id: 24,
				name: 'Set up personal newsletter',
				blockedBy: [8, 16, 17]
			},
			{
				id: 25,
				name: 'Set up speaking kit',
				blockedBy: [8, 9, 19, 20, 23]
			}
		]
	},
	{
		name: 'Starting a YouTube channel',
		tasks: [
			{
				id: 1,
				name: 'Define channel niche and target audience',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Research competitors in your niche',
				blockedBy: [1]
			},
			{
				id: 3,
				name: 'Brainstorm video ideas',
				blockedBy: [1, 2]
			},
			{
				id: 4,
				name: 'Come up with channel name',
				blockedBy: [1]
			},
			{
				id: 5,
				name: 'Create YouTube account',
				blockedBy: [4]
			},
			{
				id: 6,
				name: 'Write channel description',
				blockedBy: [1, 4, 5]
			},
			{
				id: 7,
				name: 'Design channel logo',
				blockedBy: [4, 5]
			},
			{
				id: 8,
				name: 'Design channel banner',
				blockedBy: [4, 5, 7]
			},
			{
				id: 9,
				name: 'Research video equipment needs',
				blockedBy: [1]
			},
			{
				id: 10,
				name: 'Purchase camera/microphone equipment',
				blockedBy: [9]
			},
			{
				id: 11,
				name: 'Research video editing tools',
				blockedBy: [1]
			},
			{
				id: 12,
				name: 'Install and learn editing software',
				blockedBy: [11]
			},
			{
				id: 13,
				name: 'Set up recording space',
				blockedBy: [9, 10]
			},
			{
				id: 14,
				name: 'Create intro/outro sequences',
				blockedBy: [7, 12]
			},
			{
				id: 15,
				name: 'Design thumbnail templates',
				blockedBy: [7]
			},
			{
				id: 16,
				name: 'Design end screen templates',
				blockedBy: [7]
			},
			{
				id: 17,
				name: 'Create video descriptions template',
				blockedBy: [6]
			},
			{
				id: 18,
				name: 'Prepare content calendar',
				blockedBy: [3]
			},
			{
				id: 19,
				name: 'Pitch channel idea to friends',
				blockedBy: [1, 4]
			},
			{
				id: 20,
				name: 'Record first video',
				blockedBy: [3, 10, 13, 18]
			},
			{
				id: 21,
				name: 'Edit first video',
				blockedBy: [12, 14, 20]
			},
			{
				id: 22,
				name: 'Create thumbnail for first video',
				blockedBy: [15, 20]
			},
			{
				id: 23,
				name: 'Upload first video',
				blockedBy: [5, 6, 17, 21, 22]
			},
			{
				id: 24,
				name: 'Create channel trailer',
				blockedBy: [13, 14, 23]
			},
			{
				id: 25,
				name: 'Set up social media accounts',
				blockedBy: [4, 7]
			},
			{
				id: 26,
				name: 'Create playlist system',
				blockedBy: [5, 23]
			},
			{
				id: 27,
				name: 'Set up backup system',
				blockedBy: [20, 21]
			},
			{
				id: 28,
				name: 'Set up monetization',
				blockedBy: [23]
			},
			{
				id: 29,
				name: 'Design merch concepts',
				blockedBy: [7, 23]
			},
			{
				id: 30,
				name: 'Organize a video watching event',
				blockedBy: [19, 23]
			}
		]
	},
	{
		name: 'Home organization',
		tasks: [
			{
				id: 1,
				name: 'Assess organizational needs for each room',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Create inventory of storage containers needed',
				blockedBy: [1]
			},
			{
				id: 3,
				name: 'Purchase storage bins and containers',
				blockedBy: [2]
			},
			{
				id: 4,
				name: 'Create labeled storage bins',
				blockedBy: [3]
			},
			{
				id: 5,
				name: 'Sort items by keep, donate, and discard',
				blockedBy: [1]
			},
			{
				id: 6,
				name: 'Organize clothing by category and season',
				blockedBy: [4, 5]
			},
			{
				id: 7,
				name: 'Create closet organization system',
				blockedBy: [6]
			},
			{
				id: 8,
				name: 'Take inventory of documents',
				blockedBy: [1]
			},
			{
				id: 9,
				name: 'Purchase filing supplies',
				blockedBy: [8]
			},
			{
				id: 10,
				name: 'Set up paper filing system for documents',
				blockedBy: [8, 9]
			},
			{
				id: 11,
				name: 'Digitize important documents',
				blockedBy: [10]
			},
			{
				id: 12,
				name: 'Set up or revise system for processing mail',
				blockedBy: [10]
			},
			{
				id: 13,
				name: 'Take inventory of digital photos',
				blockedBy: []
			},
			{
				id: 14,
				name: 'Create digital folder system',
				blockedBy: [13]
			},
			{
				id: 15,
				name: 'Organize photo library',
				blockedBy: [13, 14]
			},
			{
				id: 16,
				name: 'Backup photo collection',
				blockedBy: [15]
			},
			{
				id: 17,
				name: 'Take inventory of tools',
				blockedBy: [1]
			},
			{
				id: 18,
				name: 'Create tool organization system',
				blockedBy: [4, 17]
			},
			{
				id: 19,
				name: 'Take inventory of pantry items',
				blockedBy: [1]
			},
			{
				id: 20,
				name: 'Purchase pantry storage solutions',
				blockedBy: [19]
			},
			{
				id: 21,
				name: 'Set up labeled pantry storage containers',
				blockedBy: [19, 20]
			},
			{
				id: 22,
				name: 'Take inventory of medications',
				blockedBy: [1]
			},
			{
				id: 23,
				name: 'Organize medication and first aid kit',
				blockedBy: [4, 22]
			},
			{
				id: 24,
				name: 'Take inventory of cleaning supplies',
				blockedBy: [1]
			},
			{
				id: 25,
				name: 'Organize cleaning supplies',
				blockedBy: [4, 24]
			},
			{
				id: 26,
				name: 'Set up or revise recycling system',
				blockedBy: [1]
			},
			{
				id: 27,
				name: 'Sort and organize cables',
				blockedBy: [4]
			},
			{
				id: 28,
				name: 'Label cables',
				blockedBy: [27]
			},
			{
				id: 29,
				name: 'Organize cables and electronics',
				blockedBy: [27, 28]
			},
			{
				id: 30,
				name: 'Organize arts and crafts supplies',
				blockedBy: [4, 5]
			},
			{
				id: 31,
				name: 'Organize pet supplies',
				blockedBy: [4, 5]
			},
			{
				id: 32,
				name: 'Sort holiday items by season/holiday',
				blockedBy: [5]
			},
			{
				id: 33,
				name: 'Organize holiday items',
				blockedBy: [4, 32]
			},
			{
				id: 34,
				name: 'Organize toiletries',
				blockedBy: [4, 5]
			},
			{
				id: 35,
				name: 'Create home inventory spreadsheet',
				blockedBy: [6, 10, 15, 18, 21, 23, 25, 29, 30, 31, 33, 34]
			},
			{
				id: 36,
				name: 'Set up maintenance schedule',
				blockedBy: [35]
			}
		]
	},
	{
		name: 'App marketing',
		tasks: [
			{
				id: 1,
				name: 'Define marketing goals and KPIs',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Identify target audience',
				blockedBy: []
			},
			{
				id: 3,
				name: 'Create app store screenshots and descriptions',
				blockedBy: []
			},
			{
				id: 4,
				name: 'Optimize App Store listing (ASO)',
				blockedBy: [2, 3]
			},
			{
				id: 5,
				name: 'Create landing page for the app',
				blockedBy: [2]
			},
			{
				id: 6,
				name: 'Create marketing materials and press kit',
				blockedBy: [2]
			},
			{
				id: 7,
				name: 'Create demo video',
				blockedBy: [6]
			},
			{
				id: 8,
				name: 'Write blog post about app launch',
				blockedBy: [6]
			},
			{
				id: 9,
				name: 'Create social media accounts for the app',
				blockedBy: [6]
			},
			{
				id: 10,
				name: 'Prepare Product Hunt submission',
				blockedBy: [5, 6, 7]
			},
			{
				id: 11,
				name: 'Submit to Product Hunt',
				blockedBy: [10]
			},
			{
				id: 12,
				name: 'Write to friends who might be interested',
				blockedBy: [6]
			},
			{
				id: 13,
				name: 'Post on own social media feeds',
				blockedBy: [6, 9]
			},
			{
				id: 14,
				name: 'Post "Show HN" on Hacker News',
				blockedBy: [6, 7]
			},
			{
				id: 15,
				name: 'Post on self-promo subreddits',
				blockedBy: [6]
			},
			{
				id: 16,
				name: 'Post to daily.dev',
				blockedBy: [6, 8]
			},
			{
				id: 17,
				name: 'Create Bluesky account and post there',
				blockedBy: [6]
			},
			{
				id: 18,
				name: 'Post in LinkedIn groups',
				blockedBy: [6]
			},
			{
				id: 19,
				name: 'Post in Facebook groups',
				blockedBy: [6]
			},
			{
				id: 20,
				name: 'Message Discord communities',
				blockedBy: [6]
			},
			{
				id: 21,
				name: 'Identify relevant influencers',
				blockedBy: [2]
			},
			{
				id: 22,
				name: 'Create influencer outreach template',
				blockedBy: [6, 21]
			},
			{
				id: 23,
				name: 'Reach out to influencers',
				blockedBy: [22]
			},
			{
				id: 24,
				name: 'Identify relevant journalists',
				blockedBy: [2]
			},
			{
				id: 25,
				name: 'Create press release',
				blockedBy: [6, 24]
			},
			{
				id: 26,
				name: 'Reach out to journalists',
				blockedBy: [25]
			},
			{
				id: 27,
				name: 'Setup analytics to track marketing effectiveness',
				blockedBy: [1]
			},
			{
				id: 28,
				name: 'Create ad creatives',
				blockedBy: [2, 6]
			},
			{
				id: 29,
				name: 'Create LinkedIn ads',
				blockedBy: [28]
			},
			{
				id: 30,
				name: 'Create reddit ads',
				blockedBy: [28]
			},
			{
				id: 31,
				name: 'Create facebook ads',
				blockedBy: [28]
			},
			{
				id: 32,
				name: 'Create short form content for TikTok, Reels or Shorts',
				blockedBy: [6, 7]
			},
			{
				id: 33,
				name: 'Setup referral program',
				blockedBy: [5, 27]
			},
			{
				id: 34,
				name: 'Launch email newsletter',
				blockedBy: [8, 27]
			},
			{
				id: 35,
				name: 'Plan app store optimization updates',
				blockedBy: [4, 27]
			},
			{
				id: 36,
				name: 'Yell your website domain in the streets',
				blockedBy: [5]
			}
		]
	}
];
