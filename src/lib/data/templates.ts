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
	},
	{
		name: 'Hosting an event',
		tasks: [
			{
				id: 1,
				name: 'Define event purpose and goals',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Set event budget',
				blockedBy: [1]
			},
			{
				id: 3,
				name: 'Choose event date and time',
				blockedBy: [1]
			},
			{
				id: 4,
				name: 'Create guest list',
				blockedBy: [1]
			},
			{
				id: 5,
				name: 'Research and scout venue options',
				blockedBy: [1, 2, 3]
			},
			{
				id: 6,
				name: 'Book venue',
				blockedBy: [2, 3, 5]
			},
			{
				id: 7,
				name: 'Create event timeline/agenda',
				blockedBy: [1, 3, 6]
			},
			{
				id: 8,
				name: 'Design and send invitations',
				blockedBy: [3, 4, 6, 7]
			},
			{
				id: 9,
				name: 'Create RSVP tracking system',
				blockedBy: [4, 8]
			},
			{
				id: 10,
				name: 'Research catering options',
				blockedBy: [2, 6]
			},
			{
				id: 11,
				name: 'Plan menu',
				blockedBy: [2, 10]
			},
			{
				id: 12,
				name: 'Book caterer or purchase food supplies',
				blockedBy: [2, 11]
			},
			{
				id: 13,
				name: 'Plan and source beverages',
				blockedBy: [2, 11]
			},
			{
				id: 14,
				name: 'Research entertainment options',
				blockedBy: [1, 2, 7]
			},
			{
				id: 15,
				name: 'Book entertainment',
				blockedBy: [2, 14]
			},
			{
				id: 16,
				name: 'Create event theme and decoration plan',
				blockedBy: [1, 6]
			},
			{
				id: 17,
				name: 'Purchase or rent decorations',
				blockedBy: [2, 16]
			},
			{
				id: 18,
				name: 'Research and book photography/videography',
				blockedBy: [2, 6]
			},
			{
				id: 19,
				name: 'Create seating chart or arrangement',
				blockedBy: [6, 9]
			},
			{
				id: 20,
				name: 'Arrange for tables, chairs, and furniture',
				blockedBy: [2, 6, 19]
			},
			{
				id: 21,
				name: 'Coordinate with speakers or presenters',
				blockedBy: [7]
			},
			{
				id: 22,
				name: 'Arrange for audio/visual equipment',
				blockedBy: [2, 6, 21]
			},
			{
				id: 23,
				name: 'Create event program or handouts',
				blockedBy: [7, 21]
			},
			{
				id: 24,
				name: 'Purchase party favors or gifts',
				blockedBy: [2, 9]
			},
			{
				id: 25,
				name: 'Arrange transportation or parking',
				blockedBy: [2, 6, 9]
			},
			{
				id: 26,
				name: 'Create setup team schedule',
				blockedBy: [6, 7]
			},
			{
				id: 27,
				name: 'Create day-of event staff schedule',
				blockedBy: [7, 26]
			},
			{
				id: 28,
				name: 'Send event reminders to guests',
				blockedBy: [8, 9]
			},
			{
				id: 29,
				name: 'Create name tags or badges',
				blockedBy: [9]
			},
			{
				id: 30,
				name: 'Confirm all vendor arrangements',
				blockedBy: [12, 13, 15, 18, 20, 22]
			},
			{
				id: 31,
				name: 'Prepare welcome speech or talking points',
				blockedBy: [7]
			},
			{
				id: 32,
				name: 'Create event setup checklist',
				blockedBy: [7, 12, 17, 20, 22, 23]
			},
			{
				id: 33,
				name: 'Set up venue',
				blockedBy: [17, 20, 22, 26, 32]
			},
			{
				id: 34,
				name: 'Final venue walkthrough',
				blockedBy: [33]
			},
			{
				id: 35,
				name: 'Host the event',
				blockedBy: [27, 28, 30, 31, 34]
			},
			{
				id: 36,
				name: 'Clean up and break down',
				blockedBy: [35]
			},
			{
				id: 37,
				name: 'Return rented items',
				blockedBy: [36]
			},
			{
				id: 38,
				name: 'Send thank you notes',
				blockedBy: [35]
			},
			{
				id: 39,
				name: 'Collect and review feedback',
				blockedBy: [35]
			},
			{
				id: 40,
				name: 'Create event summary and lessons learned',
				blockedBy: [39]
			}
		]
	},
	{
		name: 'Starting a business',
		tasks: [
			{
				id: 1,
				name: 'Research business ideas',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Define business concept and value proposition',
				blockedBy: [1]
			},
			{
				id: 3,
				name: 'Conduct market research',
				blockedBy: [2]
			},
			{
				id: 4,
				name: 'Identify target customers',
				blockedBy: [2, 3]
			},
			{
				id: 5,
				name: 'Analyze competitors',
				blockedBy: [2, 3]
			},
			{
				id: 6,
				name: 'Choose business name',
				blockedBy: [2]
			},
			{
				id: 7,
				name: 'Check name availability and domain',
				blockedBy: [6]
			},
			{
				id: 8,
				name: 'Create business plan',
				blockedBy: [2, 3, 4, 5]
			},
			{
				id: 9,
				name: 'Determine startup costs',
				blockedBy: [8]
			},
			{
				id: 10,
				name: 'Identify funding sources',
				blockedBy: [9]
			},
			{
				id: 11,
				name: 'Secure initial funding',
				blockedBy: [10]
			},
			{
				id: 12,
				name: 'Choose business structure (LLC, Corp, etc.)',
				blockedBy: [8]
			},
			{
				id: 13,
				name: 'Register business with state/local authorities',
				blockedBy: [6, 7, 12]
			},
			{
				id: 14,
				name: 'Obtain EIN (tax ID)',
				blockedBy: [13]
			},
			{
				id: 15,
				name: 'Open business bank account',
				blockedBy: [13, 14]
			},
			{
				id: 16,
				name: 'Set up accounting system',
				blockedBy: [15]
			},
			{
				id: 17,
				name: 'Obtain necessary licenses and permits',
				blockedBy: [12, 13]
			},
			{
				id: 18,
				name: 'Purchase business insurance',
				blockedBy: [12, 13]
			},
			{
				id: 19,
				name: 'Develop brand identity (logo, colors)',
				blockedBy: [6]
			},
			{
				id: 20,
				name: 'Purchase domain name',
				blockedBy: [7, 11]
			},
			{
				id: 21,
				name: 'Create business website',
				blockedBy: [19, 20]
			},
			{
				id: 22,
				name: 'Create social media accounts',
				blockedBy: [6, 19]
			},
			{
				id: 23,
				name: 'Create business email',
				blockedBy: [20]
			},
			{
				id: 24,
				name: 'Source inventory/equipment',
				blockedBy: [11]
			},
			{
				id: 25,
				name: 'Set up workspace/office',
				blockedBy: [11, 24]
			},
			{
				id: 26,
				name: 'Hire initial employees (if needed)',
				blockedBy: [11, 14, 16, 18]
			},
			{
				id: 27,
				name: 'Develop initial products/services',
				blockedBy: [4, 5, 8, 11]
			},
			{
				id: 28,
				name: 'Set pricing strategy',
				blockedBy: [4, 5, 27]
			},
			{
				id: 29,
				name: 'Create marketing strategy',
				blockedBy: [4, 5, 19, 28]
			},
			{
				id: 30,
				name: 'Develop sales process',
				blockedBy: [28, 29]
			},
			{
				id: 31,
				name: 'Create business cards and materials',
				blockedBy: [19, 23]
			},
			{
				id: 32,
				name: 'Plan launch event/promotion',
				blockedBy: [27, 29]
			},
			{
				id: 33,
				name: 'Test products/services with beta customers',
				blockedBy: [27]
			},
			{
				id: 34,
				name: 'Refine offerings based on feedback',
				blockedBy: [33]
			},
			{
				id: 35,
				name: 'Launch business officially',
				blockedBy: [17, 18, 21, 22, 25, 30, 31, 32, 34]
			}
		]
	},
	{
		name: 'Job hunting',
		tasks: [
			{
				id: 1,
				name: 'Define career goals and job preferences',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Assess skills and qualifications',
				blockedBy: []
			},
			{
				id: 3,
				name: 'Research target industries',
				blockedBy: [1]
			},
			{
				id: 4,
				name: 'Research potential employers',
				blockedBy: [1, 3]
			},
			{
				id: 5,
				name: 'Update resume',
				blockedBy: [1, 2]
			},
			{
				id: 6,
				name: 'Create master cover letter template',
				blockedBy: [1, 2, 5]
			},
			{
				id: 7,
				name: 'Set up LinkedIn profile',
				blockedBy: [1, 2, 5]
			},
			{
				id: 8,
				name: 'Update other social media profiles',
				blockedBy: [1]
			},
			{
				id: 9,
				name: 'Create or update portfolio',
				blockedBy: [1, 2, 5]
			},
			{
				id: 10,
				name: 'Identify professional references',
				blockedBy: [1]
			},
			{
				id: 11,
				name: 'Contact references for permission',
				blockedBy: [10]
			},
			{
				id: 12,
				name: 'Create reference document',
				blockedBy: [11]
			},
			{
				id: 13,
				name: 'Set up job search tracking system',
				blockedBy: []
			},
			{
				id: 14,
				name: 'Set up alerts on job boards',
				blockedBy: [1, 3, 4, 13]
			},
			{
				id: 15,
				name: 'Register with recruitment agencies',
				blockedBy: [5, 7]
			},
			{
				id: 16,
				name: 'Create elevator pitch',
				blockedBy: [1, 2]
			},
			{
				id: 17,
				name: 'Research typical interview questions',
				blockedBy: [1, 3]
			},
			{
				id: 18,
				name: 'Practice interview responses',
				blockedBy: [16, 17]
			},
			{
				id: 19,
				name: 'Research salary expectations',
				blockedBy: [1, 3, 4]
			},
			{
				id: 20,
				name: 'Prepare salary negotiation approach',
				blockedBy: [19]
			},
			{
				id: 21,
				name: 'Inform network of job search',
				blockedBy: [1, 2, 5, 7]
			},
			{
				id: 22,
				name: 'Identify networking opportunities',
				blockedBy: [1, 3]
			},
			{
				id: 23,
				name: 'Attend industry events and meetups',
				blockedBy: [16, 22]
			},
			{
				id: 24,
				name: 'Search for job openings',
				blockedBy: [1, 3, 4, 13]
			},
			{
				id: 25,
				name: 'Customize resume for each application',
				blockedBy: [5, 24]
			},
			{
				id: 26,
				name: 'Customize cover letter for each application',
				blockedBy: [6, 24]
			},
			{
				id: 27,
				name: 'Submit job applications',
				blockedBy: [24, 25, 26]
			},
			{
				id: 28,
				name: 'Follow up on applications',
				blockedBy: [27]
			},
			{
				id: 29,
				name: 'Schedule interviews',
				blockedBy: [27, 28]
			},
			{
				id: 30,
				name: 'Research company before interview',
				blockedBy: [29]
			},
			{
				id: 31,
				name: 'Prepare questions for interviewers',
				blockedBy: [30]
			},
			{
				id: 32,
				name: 'Plan interview outfit',
				blockedBy: [29]
			},
			{
				id: 33,
				name: 'Attend interview',
				blockedBy: [18, 29, 30, 31, 32]
			},
			{
				id: 34,
				name: 'Send thank you note after interview',
				blockedBy: [33]
			},
			{
				id: 35,
				name: 'Follow up if no response received',
				blockedBy: [34]
			},
			{
				id: 36,
				name: 'Evaluate job offers',
				blockedBy: [19, 33]
			},
			{
				id: 37,
				name: 'Negotiate job offer',
				blockedBy: [20, 36]
			},
			{
				id: 38,
				name: 'Accept job offer',
				blockedBy: [37]
			},
			{
				id: 39,
				name: 'Notify other potential employers',
				blockedBy: [38]
			},
			{
				id: 40,
				name: 'Plan first day preparations',
				blockedBy: [38]
			}
		]
	},
	{
		name: 'Starting a garden',
		tasks: [
			{
				id: 1,
				name: 'Decide garden purpose (vegetables, flowers, herbs)',
				blockedBy: []
			},
			{
				id: 2,
				name: 'Assess available space',
				blockedBy: []
			},
			{
				id: 3,
				name: 'Determine sun exposure in garden area',
				blockedBy: [2]
			},
			{
				id: 4,
				name: 'Test soil quality',
				blockedBy: [2]
			},
			{
				id: 5,
				name: 'Research plants suited to your climate',
				blockedBy: [1]
			},
			{
				id: 6,
				name: 'Research plants suited to your soil and sun exposure',
				blockedBy: [3, 4, 5]
			},
			{
				id: 7,
				name: 'Create garden design/layout',
				blockedBy: [1, 2, 6]
			},
			{
				id: 8,
				name: 'Determine garden type (in-ground, raised bed, containers)',
				blockedBy: [2, 4]
			},
			{
				id: 9,
				name: 'Create planting calendar',
				blockedBy: [5, 6, 7]
			},
			{
				id: 10,
				name: 'Make list of needed supplies and tools',
				blockedBy: [7, 8]
			},
			{
				id: 11,
				name: 'Purchase basic gardening tools',
				blockedBy: [10]
			},
			{
				id: 12,
				name: 'Purchase containers or materials for raised beds (if needed)',
				blockedBy: [8, 10]
			},
			{
				id: 13,
				name: 'Purchase soil amendments or potting mix',
				blockedBy: [4, 8, 10]
			},
			{
				id: 14,
				name: 'Establish garden boundary/clear area',
				blockedBy: [2, 7, 11]
			},
			{
				id: 15,
				name: 'Build raised beds or set up containers (if needed)',
				blockedBy: [12, 14]
			},
			{
				id: 16,
				name: 'Install irrigation/watering system (if needed)',
				blockedBy: [7, 14, 15]
			},
			{
				id: 17,
				name: 'Amend soil or fill containers with soil',
				blockedBy: [13, 14, 15]
			},
			{
				id: 18,
				name: 'Create paths or walkways (if needed)',
				blockedBy: [7, 14, 15]
			},
			{
				id: 19,
				name: 'Purchase seeds or starter plants',
				blockedBy: [6, 9]
			},
			{
				id: 20,
				name: 'Start seeds indoors (if needed)',
				blockedBy: [9, 19]
			},
			{
				id: 21,
				name: 'Install trellises or supports (if needed)',
				blockedBy: [7, 15, 17]
			},
			{
				id: 22,
				name: 'Prepare planting areas',
				blockedBy: [17]
			},
			{
				id: 23,
				name: 'Plant seeds or starter plants outdoors',
				blockedBy: [9, 19, 22]
			},
			{
				id: 24,
				name: 'Transplant indoor seedlings to garden',
				blockedBy: [9, 20, 22]
			},
			{
				id: 25,
				name: 'Apply initial fertilizer',
				blockedBy: [23, 24]
			},
			{
				id: 26,
				name: 'Apply mulch',
				blockedBy: [23, 24]
			},
			{
				id: 27,
				name: 'Set up plant labels/markers',
				blockedBy: [23, 24]
			},
			{
				id: 28,
				name: 'Create garden journal',
				blockedBy: [23, 24]
			},
			{
				id: 29,
				name: 'Establish watering schedule',
				blockedBy: [16, 23, 24]
			},
			{
				id: 30,
				name: 'Create pest management plan',
				blockedBy: [23, 24]
			},
			{
				id: 31,
				name: 'Monitor for pests and diseases',
				blockedBy: [23, 24, 30]
			},
			{
				id: 32,
				name: 'Create fertilizing schedule',
				blockedBy: [25]
			},
			{
				id: 33,
				name: 'Plan for succession planting',
				blockedBy: [9, 28]
			},
			{
				id: 34,
				name: 'Install garden decorations or features',
				blockedBy: [18, 23, 24]
			},
			{
				id: 35,
				name: 'Start compost system',
				blockedBy: [11]
			}
		]
	}
];

// These can be added to your existing TEMPLATES array
