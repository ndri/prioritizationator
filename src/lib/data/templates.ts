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
				name: 'Research transportation options',
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
				blockedBy: []
			},
			{
				id: 9,
				name: 'Get necessary vaccinations',
				blockedBy: [8]
			},
			{
				id: 10,
				name: 'Research travel insurance',
				blockedBy: []
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
				name: 'Research travel clothing and gear needs',
				blockedBy: []
			},
			{
				id: 15,
				name: 'Purchase necessary clothing and gear',
				blockedBy: [3, 14]
			},
			{
				id: 16,
				name: 'Create detailed itinerary',
				blockedBy: [5, 6, 7, 13]
			},
			{
				id: 17,
				name: 'Share itinerary with emergency contacts',
				blockedBy: [16]
			},
			{
				id: 18,
				name: 'Pack luggage',
				blockedBy: [15, 16]
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
				blockedBy: []
			},
			{
				id: 10,
				name: 'Design resume',
				blockedBy: [5, 8]
			},
			{
				id: 11,
				name: 'Design cover letter template',
				blockedBy: [5, 8]
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
				name: 'Create bio templates',
				blockedBy: [4, 5]
			},
			{
				id: 16,
				name: 'Set up portfolio website',
				blockedBy: [8, 9]
			},
			{
				id: 17,
				name: 'Create project showcase',
				blockedBy: [16]
			},
			{
				id: 18,
				name: 'Create media kit',
				blockedBy: [6, 8, 9, 15]
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
				blockedBy: []
			},
			{
				id: 3,
				name: 'Brainstorm video ideas',
				blockedBy: [1, 2]
			},
			{
				id: 4,
				name: 'Come up with channel name',
				blockedBy: []
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
				name: 'Design channel logo and banner',
				blockedBy: [4, 5]
			},
			{
				id: 8,
				name: 'Research video equipment needs',
				blockedBy: []
			},
			{
				id: 9,
				name: 'Purchase camera/microphone equipment',
				blockedBy: [8]
			},
			{
				id: 10,
				name: 'Research video editing tools',
				blockedBy: []
			},
			{
				id: 11,
				name: 'Install and learn editing software',
				blockedBy: [10]
			},
			{
				id: 12,
				name: 'Set up recording space',
				blockedBy: [9]
			},
			{
				id: 13,
				name: 'Create intro/outro sequences',
				blockedBy: [7, 11]
			},
			{
				id: 14,
				name: 'Design thumbnail templates',
				blockedBy: [7]
			},
			{
				id: 15,
				name: 'Create video descriptions template',
				blockedBy: [6]
			},
			{
				id: 16,
				name: 'Prepare content calendar',
				blockedBy: [3]
			},
			{
				id: 17,
				name: 'Record first video',
				blockedBy: [3, 9, 12, 16]
			},
			{
				id: 18,
				name: 'Edit first video',
				blockedBy: [11, 13, 17]
			},
			{
				id: 19,
				name: 'Create thumbnail for first video',
				blockedBy: [14, 17]
			},
			{
				id: 20,
				name: 'Upload first video',
				blockedBy: [5, 6, 15, 18, 19]
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
				name: 'Create inventory of storage needs',
				blockedBy: []
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
				blockedBy: []
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
				blockedBy: []
			},
			{
				id: 9,
				name: 'Purchase filing supplies',
				blockedBy: [8]
			},
			{
				id: 10,
				name: 'Set up paper filing system for documents',
				blockedBy: [9]
			},
			{
				id: 11,
				name: 'Organize digital photos',
				blockedBy: []
			},
			{
				id: 12,
				name: 'Take inventory of tools and create organization system',
				blockedBy: [4]
			},
			{
				id: 13,
				name: 'Take inventory of pantry items',
				blockedBy: []
			},
			{
				id: 14,
				name: 'Set up labeled pantry storage',
				blockedBy: [3, 13]
			},
			{
				id: 15,
				name: 'Organize medication and first aid kit',
				blockedBy: [4]
			},
			{
				id: 16,
				name: 'Organize cleaning supplies',
				blockedBy: [4]
			},
			{
				id: 17,
				name: 'Sort and organize cables',
				blockedBy: [4]
			},
			{
				id: 18,
				name: 'Create home inventory spreadsheet',
				blockedBy: [6, 10, 11, 12, 14, 15, 16, 17]
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
				blockedBy: []
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
				blockedBy: []
			},
			{
				id: 9,
				name: 'Create social media accounts for the app',
				blockedBy: []
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
				name: 'Post on own social media feeds',
				blockedBy: [6, 9]
			},
			{
				id: 13,
				name: 'Post "Show HN" on Hacker News',
				blockedBy: [6, 7]
			},
			{
				id: 14,
				name: 'Identify relevant influencers',
				blockedBy: []
			},
			{
				id: 15,
				name: 'Create influencer outreach template',
				blockedBy: [6, 14]
			},
			{
				id: 16,
				name: 'Reach out to influencers',
				blockedBy: [15]
			},
			{
				id: 17,
				name: 'Setup analytics to track marketing effectiveness',
				blockedBy: [1]
			},
			{
				id: 18,
				name: 'Create ad creatives',
				blockedBy: [2, 6]
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
				blockedBy: []
			},
			{
				id: 3,
				name: 'Choose event date and time',
				blockedBy: []
			},
			{
				id: 4,
				name: 'Create guest list',
				blockedBy: []
			},
			{
				id: 5,
				name: 'Research and scout venue options',
				blockedBy: [1, 2, 3]
			},
			{
				id: 6,
				name: 'Book venue',
				blockedBy: [5]
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
				name: 'Plan menu',
				blockedBy: [2]
			},
			{
				id: 11,
				name: 'Book caterer or purchase food supplies',
				blockedBy: [2, 10]
			},
			{
				id: 12,
				name: 'Plan and source beverages',
				blockedBy: [2, 10]
			},
			{
				id: 13,
				name: 'Book entertainment',
				blockedBy: [2]
			},
			{
				id: 14,
				name: 'Purchase or rent decorations',
				blockedBy: [2]
			},
			{
				id: 15,
				name: 'Arrange for tables, chairs, and furniture',
				blockedBy: [2, 6]
			},
			{
				id: 16,
				name: 'Arrange for audio/visual equipment',
				blockedBy: [2, 6]
			},
			{
				id: 17,
				name: 'Create setup team schedule',
				blockedBy: [6, 7]
			},
			{
				id: 18,
				name: 'Host the event',
				blockedBy: [8, 9, 11, 12, 13, 14, 15, 16, 17]
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
				blockedBy: []
			},
			{
				id: 3,
				name: 'Conduct market research',
				blockedBy: []
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
				blockedBy: []
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
				blockedBy: []
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
				name: 'Develop brand identity (logo, colors)',
				blockedBy: []
			},
			{
				id: 16,
				name: 'Purchase domain name',
				blockedBy: [7, 11]
			},
			{
				id: 17,
				name: 'Develop initial products/services',
				blockedBy: [4, 5, 8, 11]
			},
			{
				id: 18,
				name: 'Set pricing strategy',
				blockedBy: [4, 5, 17]
			},
			{
				id: 19,
				name: 'Create marketing strategy',
				blockedBy: [4, 5, 15, 18]
			},
			{
				id: 20,
				name: 'Launch business officially',
				blockedBy: [13, 14, 17, 18, 19]
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
				blockedBy: []
			},
			{
				id: 4,
				name: 'Research potential employers',
				blockedBy: []
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
				name: 'Identify professional references',
				blockedBy: []
			},
			{
				id: 9,
				name: 'Contact references for permission',
				blockedBy: [8]
			},
			{
				id: 10,
				name: 'Set up job search tracking system',
				blockedBy: []
			},
			{
				id: 11,
				name: 'Create elevator pitch',
				blockedBy: [1, 2]
			},
			{
				id: 12,
				name: 'Research typical interview questions',
				blockedBy: [1, 3]
			},
			{
				id: 13,
				name: 'Practice interview responses',
				blockedBy: [11, 12]
			},
			{
				id: 14,
				name: 'Research salary expectations',
				blockedBy: [3, 4]
			},
			{
				id: 15,
				name: 'Search for job openings',
				blockedBy: [1, 3, 4, 10]
			},
			{
				id: 16,
				name: 'Submit job applications',
				blockedBy: [5, 6, 15]
			},
			{
				id: 17,
				name: 'Schedule interviews',
				blockedBy: [16]
			},
			{
				id: 18,
				name: 'Research company before interview',
				blockedBy: [17]
			},
			{
				id: 19,
				name: 'Attend interview',
				blockedBy: [13, 17, 18]
			},
			{
				id: 20,
				name: 'Accept job offer',
				blockedBy: [19]
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
				blockedBy: []
			},
			{
				id: 4,
				name: 'Test soil quality',
				blockedBy: []
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
				name: 'Amend soil or fill containers with soil',
				blockedBy: [13, 14, 15]
			},
			{
				id: 17,
				name: 'Purchase seeds or starter plants',
				blockedBy: [6, 9]
			},
			{
				id: 18,
				name: 'Prepare planting areas',
				blockedBy: [16]
			},
			{
				id: 19,
				name: 'Plant seeds or starter plants outdoors',
				blockedBy: [17, 18]
			},
			{
				id: 20,
				name: 'Apply mulch',
				blockedBy: [19]
			}
		]
	}
];
