playbooks_data = [

    # ---------------- D2C ----------------
    {
        "sector": "D2C", "stage": "pre_revenue",
        "milestone_title": "Validate real demand before spending on inventory",
        "tactics": [
            {"title": "Pre-order landing page test", "description": "Build a simple page with a 'Reserve Now' button and a small refundable deposit (₹99-199) to prove people will pay before you manufacture.", "platform": "Instagram / WhatsApp Business / Razorpay Payment Links"},
            {"title": "Micro-influencer seeding", "description": "Send free samples to 10-15 nano-influencers (5k-20k followers) in your specific niche for honest posts, not scripted ads.", "platform": "Instagram"},
            {"title": "Founder-led community selling", "description": "Manually sell your first 20-30 units through WhatsApp groups and your existing network before touching any ad platform.", "platform": "WhatsApp"}
        ],
        "tools_platforms": ["Instagram", "WhatsApp Business", "Razorpay", "Canva"],
        "success_metric": "50 pre-orders OR 200 genuine waitlist signups within 60 days",
        "next_stage_trigger": "First 10 paying customers who received the actual product",
        "funding_suggestion": "bootstrap",
        "common_mistake": "Manufacturing a large batch of inventory before validating demand."
    },
    {
        "sector": "D2C", "stage": "early_revenue",
        "milestone_title": "Move from manual sales to repeatable distribution",
        "tactics": [
            {"title": "List on ONDC", "description": "Onboard via an ONDC seller app (e.g. through a Seller Network Participant) to access India's open commerce network without heavy platform fees.", "platform": "ONDC"},
            {"title": "Quick-commerce listing", "description": "Approach Zepto/Blinkit's brand partnership programs once you have consistent stock and unit economics that survive their margin cuts.", "platform": "Zepto / Blinkit"},
            {"title": "Retarget your existing buyers", "description": "Run small-budget retargeting ads (₹5-10k/month) to past buyers and site visitors before spending on cold-audience acquisition.", "platform": "Meta Ads Manager"}
        ],
        "tools_platforms": ["ONDC", "Zepto", "Blinkit", "Meta Ads Manager", "Shopify/WooCommerce"],
        "success_metric": "₹1-3L monthly revenue with positive contribution margin (post shipping+COGS)",
        "next_stage_trigger": "Consistent ₹5L+ MRR for 3 consecutive months",
        "funding_suggestion": "grants",
        "common_mistake": "Scaling paid ad spend before contribution margin is actually positive — growth that loses money faster."
    },
    {
        "sector": "D2C", "stage": "scaling",
        "milestone_title": "Scale acquisition without letting CAC erode margins",
        "tactics": [
            {"title": "Influencer tiering", "description": "Move from nano-influencer gifting to a paid tiered program (nano/micro/macro) with tracked promo codes so ROI per tier is measurable.", "platform": "Instagram / Affiliate tools"},
            {"title": "Category expansion via existing customers", "description": "Launch adjacent SKUs to your repeat-buyer base before spending to acquire new customers — retention economics beat acquisition economics at this stage.", "platform": "Email/WhatsApp CRM"},
            {"title": "Performance marketing with strict CAC caps", "description": "Scale Meta/Google spend only within a pre-set CAC:LTV ratio (aim for 1:3), pausing campaigns that breach it rather than chasing volume.", "platform": "Meta Ads / Google Ads"}
        ],
        "tools_platforms": ["Meta Ads Manager", "Google Ads", "WhatsApp CRM (e.g. Interakt)", "Shopify"],
        "success_metric": "₹15L+ MRR with CAC:LTV ratio better than 1:3",
        "next_stage_trigger": "Consideration for seed/Series A or profitable steady-state",
        "funding_suggestion": "seed",
        "common_mistake": "Chasing revenue growth via ad spend while CAC quietly exceeds customer lifetime value."
    },

    # ---------------- B2B ----------------
    {
        "sector": "B2B", "stage": "pre_revenue",
        "milestone_title": "Land 3-5 pilot clients through direct relationships, not cold outreach",
        "tactics": [
            {"title": "Warm network pilots", "description": "Approach 10-15 people from your existing professional network (ex-colleagues, LinkedIn connections) to pilot your solution free or heavily discounted in exchange for structured feedback.", "platform": "LinkedIn / Personal network"},
            {"title": "Founder-led problem interviews", "description": "Run 15-20 discovery calls with target buyers before building more — confirm the problem is painful and budgeted for, not just 'interesting'.", "platform": "LinkedIn / Calendly"},
            {"title": "Case study from first pilot", "description": "Turn your very first successful pilot into a detailed case study with real numbers — this becomes your primary sales asset for the next 10 prospects.", "platform": "Notion / PDF"}
        ],
        "tools_platforms": ["LinkedIn", "Calendly", "Notion"],
        "success_metric": "3-5 active pilots with at least 1 documented case study",
        "next_stage_trigger": "First paying (non-pilot) contract signed",
        "funding_suggestion": "bootstrap",
        "common_mistake": "Building extensive product features before confirming a paying budget actually exists for the problem."
    },
    {
        "sector": "B2B", "stage": "early_revenue",
        "milestone_title": "Build repeatable outbound and access government/enterprise channels",
        "tactics": [
            {"title": "GeM registration", "description": "Register on the Government e-Marketplace (GeM) if your offering fits public-sector procurement — this opens a large, low-competition buyer channel many startups ignore.", "platform": "GeM (Government e-Marketplace)"},
            {"title": "Structured LinkedIn outbound", "description": "Run targeted outbound (50-100 personalized connections/week) to a narrowly defined ICP, using your case study as the opener, not a generic pitch.", "platform": "LinkedIn Sales Navigator"},
            {"title": "Referral loop from existing clients", "description": "Systematically ask every satisfied client for 2 warm introductions — B2B referral-sourced deals close faster and cheaper than cold outbound.", "platform": "Email / LinkedIn"}
        ],
        "tools_platforms": ["GeM", "LinkedIn Sales Navigator", "HubSpot/Notion CRM"],
        "success_metric": "₹3-8L MRR with a repeatable, documented sales process",
        "next_stage_trigger": "Consistent pipeline generating 5+ qualified leads/month without founder's personal network",
        "funding_suggestion": "grants",
        "common_mistake": "Relying entirely on the founder's personal network for every deal, with no repeatable outbound process being built underneath."
    },
    {
        "sector": "B2B", "stage": "scaling",
        "milestone_title": "Decide between hiring sales vs. staying founder-led",
        "tactics": [
            {"title": "Hire first AE only after founder has a repeatable playbook", "description": "Don't hire salespeople to 'figure out' sales — hire only once the founder has personally closed 15-20 deals and can document the exact process to hand off.", "platform": "Internal hiring"},
            {"title": "RFP participation for larger public contracts", "description": "Once GeM presence is established, actively bid on relevant RFPs/tenders rather than only passive listing.", "platform": "GeM / State e-procurement portals"},
            {"title": "Expansion revenue from existing accounts", "description": "Prioritize upsell/cross-sell to existing clients before expensive new-logo acquisition — B2B expansion revenue is typically far cheaper to generate.", "platform": "Internal CRM"}
        ],
        "tools_platforms": ["GeM", "State e-procurement portals", "HubSpot", "LinkedIn Sales Navigator"],
        "success_metric": "₹20L+ MRR with a sales team generating leads independent of the founder",
        "next_stage_trigger": "Consideration for Series A or steady profitable growth",
        "funding_suggestion": "RBF",
        "common_mistake": "Hiring a sales team before the founder has a proven, teachable sales process — new hires flounder without a playbook."
    },

    # ---------------- SaaS ----------------
    {
        "sector": "SaaS", "stage": "pre_revenue",
        "milestone_title": "Validate the problem with real design partners before building extensively",
        "tactics": [
            {"title": "10 design-partner interviews", "description": "Talk to 10+ potential users in depth about their current workaround for the problem before writing production code — confirm willingness to pay, not just interest.", "platform": "LinkedIn / Cold email"},
            {"title": "Landing page + waitlist", "description": "Launch a simple landing page describing the product clearly, collect waitlist signups to gauge real interest before full build.", "platform": "Framer/Webflow"},
            {"title": "Manual/no-code MVP first", "description": "Deliver the core value manually or via no-code tools (Airtable, Zapier) to your first 3-5 users before investing in custom engineering.", "platform": "Airtable / Zapier"}
        ],
        "tools_platforms": ["Framer/Webflow", "Airtable", "Zapier", "Cold email tools (e.g. Lemlist)"],
        "success_metric": "3-5 design partners actively using a manual/no-code version weekly",
        "next_stage_trigger": "First 5 paying customers (even at heavily discounted 'founding member' pricing)",
        "funding_suggestion": "bootstrap",
        "common_mistake": "Spending months engineering a polished product before confirming anyone will actually pay for the core workflow."
    },
    {
        "sector": "SaaS", "stage": "early_revenue",
        "milestone_title": "Build a Product-Led Growth loop and reduce reliance on manual sales",
        "tactics": [
            {"title": "Free tier or trial with clear upgrade trigger", "description": "Design your free/trial tier so the upgrade prompt appears exactly at the point of real value realization, not on a generic time limit.", "platform": "In-app (Stripe/Razorpay billing)"},
            {"title": "IndiaAI Mission infrastructure access", "description": "If AI-compute-heavy, explore subsidized compute/infrastructure access under India's IndiaAI Mission for eligible startups — meaningfully reduces early infra costs.", "platform": "IndiaAI Mission"},
            {"title": "Content-led acquisition", "description": "Publish specific, practical content (not generic blogging) addressing the exact problem your ICP searches for — compounds organic signups over time.", "platform": "SEO / LinkedIn"}
        ],
        "tools_platforms": ["Razorpay/Stripe", "IndiaAI Mission", "Mixpanel/PostHog (product analytics)"],
        "success_metric": "₹3-5L MRR with free-to-paid conversion rate above 3-5%",
        "next_stage_trigger": "Consistent month-over-month MRR growth with shrinking CAC payback period",
        "funding_suggestion": "grants",
        "common_mistake": "Adding sales-heavy onboarding calls for every user instead of fixing the self-serve product experience that should convert them automatically."
    },
    {
        "sector": "SaaS", "stage": "scaling",
        "milestone_title": "Drive expansion revenue and infrastructure partnerships",
        "tactics": [
            {"title": "Expansion revenue focus", "description": "Prioritize upsells (seats, tiers, usage-based add-ons) to existing accounts — for SaaS, expansion MRR is typically the cheapest growth lever available.", "platform": "In-app billing"},
            {"title": "Formal IndiaAI Mission / cloud partnerships", "description": "At scale, negotiate formal infrastructure partnerships (AWS Activate, Google for Startups, or IndiaAI Mission credits) to control unit economics as usage grows.", "platform": "IndiaAI Mission / Cloud startup programs"},
            {"title": "Reduce churn before increasing acquisition spend", "description": "Fix retention/churn first — for SaaS, acquisition spend on a leaky bucket is the most common way scaling capital gets wasted.", "platform": "Product analytics (Mixpanel/PostHog)"}
        ],
        "tools_platforms": ["AWS Activate", "Google for Startups", "IndiaAI Mission", "Mixpanel/PostHog"],
        "success_metric": "₹15L+ MRR with net revenue retention above 100%",
        "next_stage_trigger": "Consideration for Series A or sustainable profitable growth",
        "funding_suggestion": "seed",
        "common_mistake": "Pouring scaling capital into new customer acquisition while churn quietly cancels out most of the growth."
    },
    #------------B2C------------------
    {
        "sector": "B2C", "stage": "pre_revenue",
        "milestone_title": "Validate willingness to pay for the service/app in one tight local or niche segment",
        "tactics": [
            {"title": "Single-neighborhood or single-niche pilot", "description": "Launch in one hyper-specific segment (one neighborhood for a local service, one university for a student app) instead of going broad — density beats spread at this stage.", "platform": "WhatsApp / Local Facebook groups"},
            {"title": "Manual concierge MVP", "description": "Deliver the service manually yourself for the first 15-20 customers (even if it doesn't scale) to learn what people actually value before building app infrastructure.", "platform": "WhatsApp / Google Forms"},
            {"title": "Charge from day one, even a small amount", "description": "Avoid giving the service away entirely free 'to get users' — even a token price validates real intent far better than free signups do.", "platform": "Razorpay Payment Links"}
        ],
        "tools_platforms": ["WhatsApp Business", "Google Forms", "Razorpay", "Local Facebook/community groups"],
        "success_metric": "20-30 paying customers in one tightly defined segment within 60 days",
        "next_stage_trigger": "Repeat usage/purchase from at least 30% of first customers",
        "funding_suggestion": "bootstrap",
        "common_mistake": "Building a full app before manually proving the service itself is something people want and will pay for."
    },
    {
        "sector": "B2C", "stage": "early_revenue",
        "milestone_title": "Expand from one segment to repeatable multi-segment growth",
        "tactics": [
            {"title": "Referral-driven expansion", "description": "Build a structured referral incentive (discount/credit for both parties) before paid ads — B2C consumer trust spreads fastest through existing users' networks.", "platform": "In-app / WhatsApp"},
            {"title": "Hyperlocal paid acquisition", "description": "Run small geo-targeted campaigns city-by-city or segment-by-segment rather than one broad national campaign, measuring CAC per segment before expanding further.", "platform": "Meta Ads / Google Ads"},
            {"title": "App store optimization (if app-based)", "description": "Invest in ASO (keywords, screenshots, ratings prompts) early — for consumer apps this is often cheaper sustained acquisition than paid ads.", "platform": "Google Play / Apple App Store"}
        ],
        "tools_platforms": ["Meta Ads Manager", "Google Ads", "App Store Optimization tools (e.g. AppTweak)"],
        "success_metric": "₹2-5L monthly revenue across 2-3 expanded segments/geographies",
        "next_stage_trigger": "Positive unit economics (CAC recovered within 3 months) across multiple segments",
        "funding_suggestion": "grants",
        "common_mistake": "Expanding to new cities/segments simultaneously before confirming the model actually works profitably in a second one."
    },
    {
        "sector": "B2C", "stage": "scaling",
        "milestone_title": "Scale acquisition while defending retention and trust at volume",
        "tactics": [
            {"title": "Retention-first scaling", "description": "Fix churn/drop-off in the core experience before increasing acquisition spend — consumer trust erodes fast at scale if service quality dips.", "platform": "Product analytics (Mixpanel/PostHog)"},
            {"title": "Brand and trust-building content", "description": "Invest in reviews, testimonials, and visible trust signals (ratings, press, certifications) — consumer purchase decisions at scale lean heavily on social proof.", "platform": "Google Reviews / Instagram / PR"},
            {"title": "Operational scaling before geographic scaling", "description": "Ensure operations (support, fulfillment, service quality) can handle 3x current volume before entering new geographies — B2C failures at scale are usually operational, not marketing.", "platform": "Internal ops/CRM tools"}
        ],
        "tools_platforms": ["Mixpanel/PostHog", "Google Reviews", "Zendesk/Freshdesk (support)"],
        "success_metric": "₹15L+ MRR with retention/repeat-usage rate holding steady as volume grows",
        "next_stage_trigger": "Consideration for seed/Series A or sustainable profitable operations",
        "funding_suggestion": "seed",
        "common_mistake": "Scaling marketing spend faster than operational capacity, causing service quality (and reviews) to collapse at exactly the moment visibility peaks."
    },
]