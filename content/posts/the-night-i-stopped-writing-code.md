---
title: "The Night I Stopped Writing Code"
date: "2026-02-12"
excerpt: "At 2 AM, holding my crying son, I realized there had to be a better way to log baby care. What happened next changed how I think about building software."
author: "Karim Alweheshy"
tags: ["parenting", "ai", "ios", "automation"]
---

It's 2 AM. My son Zane is crying. I just changed his diaper—wet, not dirty—and I need to log it in Huckleberry so my wife knows what happened when she wakes up. 

I fumble for my phone with one hand while holding him with the other. Open the app. Tap through menus. Select "diaper." Tap "wet." Tap "save." Thirty seconds. He's crying the whole time.

I think: there has to be a better way.

## The Conversation

"Can we build an iOS Shortcut that logs to Huckleberry?" I ask my AI assistant at 10 AM the next morning, caffeinated and determined.

"Huckleberry doesn't have a public API," it replies, "but there's a reverse-engineered Python library. We'd need to build a custom API server that the shortcut calls."

I pause. That sounds complicated. But then again—

"Do it," I say.

And it does.

## The Build

I watch files appear in my workspace. A Python FastAPI server. Docker configuration. Integration code. I don't write any of it. I just describe what I want: a menu-driven shortcut. Diaper types, feeding sides, sleep tracking, bottle amounts.

Ten minutes later: "API server ready. Starting Docker container."

I test it. The shortcut opens. I tap "Diaper → Wet." 

Nothing happens.

## Bug #1: The Empty Text

"It's not logging to Huckleberry," I report.

The AI checks the server logs. `{"text":""}`. The shortcut is sending empty requests.

"The variables aren't passing through," it says. "Let me rebuild it."

New shortcut. Same problem. Empty text.

We try again. And again. The programmatically-generated shortcuts keep failing to pass variables correctly. It's a subtle iOS Shortcuts quirk—something about how actions wire together in the binary plist format.

Finally, the AI switches approaches: "I'll export it directly from your Mac's Shortcuts app instead."

It works. The text flows through.

## Bug #2: The Wrong Token

I tap the shortcut. "Wet diaper."

Server logs: `[Auth] Token received: baby2026, Expected: zane2026`

Rejected.

"Your shortcut has the old token," the AI tells me.

I'd changed the API token yesterday and forgotten to update the shortcut. The AI spots it in the logs immediately, tells me exactly what to fix.

One edit. Try again. Success.

The diaper logs to Huckleberry.

## Bug #3: The Bottle Mystery

"What about bottles?" I ask.

The AI adds bottle support. I test it: "Bottle → Formula → 150ml."

The API responds: "✅ Logged 150ml formula bottle."

I open Huckleberry. No bottle.

"The bottle logged successfully to the API," the AI says, confused. Then: "Wait. Let me check the actual API call."

It reads the code it wrote. The bottle function is just printing a message, not actually calling Huckleberry.

"The reverse-engineered library doesn't have a bottle method," it realizes. "Let me implement it directly."

It tries writing to Huckleberry's Firestore database directly. I test again.

Still no bottle.

"It's writing to Firestore successfully," the AI says. "Let me check the app to see what's wrong."

It examines the Firestore documents from working bottles logged manually. The schema is different than expected.

"Found it. It needs `bottleAmount` instead of `amount`, and it stores values in ounces, not milliliters."

One more fix: convert ml to oz, use the right field names.

I test again. 150ml formula.

This time, it appears in Huckleberry. The amount shows correctly. 5.1 oz.

## The Moment

It's working. All of it. Diapers, feeds, sleep, bottles.

I didn't write a single line of code. I described what I wanted. I reported what wasn't working. I tested the outputs.

The AI wrote the code, debugged the errors, reverse-engineered the database schema, and fixed the bugs. I never opened a code editor.

## What This Actually Means

Here's the real impact: It's 3 AM. Zane is feeding. I'm holding him with one hand, phone in the other. I tap the shortcut on my home screen—it's right there, next to Messages.

Baby Log → Bottle → Formula → 150ml.

Five seconds. Done. While he's still feeding.

The log goes to Huckleberry immediately. My wife Dina's Huckleberry app updates: "Next wake time: 6:30 AM." The app uses the feeding data to predict when he'll wake up next. Accurate logs mean better predictions. Better predictions mean she can plan her sleep.

I added the shortcut to my home screen. One tap access. Siri gets it automatically—"Hey Siri, Baby Log" works from my iPhone, my wife's iPhone, the HomePod in the nursery. Anyone can log anything, instantly.

That's the power of iOS Shortcuts over standalone apps. No App Store approval. No onboarding flow. No account creation. Just: import shortcut, use it.

The difference between fumbling through the app while holding a crying baby versus three taps while he's calm? That's the difference between exhausted parents and functional parents.

This is why we build things.

## The Lesson

I'm a developer with 12+ years of experience. I could have built this myself. I know Python. I know Docker. I know APIs and Firestore and iOS Shortcuts.

But I didn't need to.

The valuable part wasn't *writing* the code. It was:
- Knowing what I needed (3-tap baby logger)
- Describing the problem clearly (iOS Shortcut → API → Huckleberry)
- Testing and reporting symptoms (empty text, wrong token, missing bottles)
- Understanding enough to evaluate tradeoffs (Tailscale vs Cloudflare)

The AI handled everything else. The syntax. The deployment. The debugging. The reverse-engineering.

I orchestrated. It implemented.

## What Made This Work

Looking back, here's what mattered:

**I knew WHAT I wanted.** Not "make baby tracking easier"—but "3-tap shortcut that logs to Huckleberry." Specific problems get specific solutions.

**I could describe symptoms.** "The bottle isn't showing up" isn't a technical diagnosis. But it's enough. The AI checks the API logs, reads the code, examines the database schema, finds the bug.

**I kept pushing.** The first shortcut failed. The second failed. The token was wrong. The bottles didn't log. The schema was incorrect. Most people stop at the first error. I reported each symptom and waited for the fix.

**I trusted, but verified.** I gave the AI my credentials. I let it deploy infrastructure. I didn't review the code. But I *tested everything*. Does it log correctly? Does it work consistently? Does the data look right?

This is the shift: you don't need to know *how* to build software anymore. You need to know *what* to build and *how* to tell when it works.

## The Moral

Software development is becoming a conversation, not a coding session.

I didn't "learn to code with AI" or "use AI to help me program." I *described a problem* and *software appeared*.

The barrier isn't coding anymore. It's problem decomposition. It's systems thinking. It's iteration tolerance.

If you can clearly articulate what you want, describe what's broken, and test what comes back—you can build software in 2025. The AI writes the code. You ship the product.

## The Hope

Here's what I'm building next: more utilities around this same webhook.

The baby log API sits there, collecting data. Diapers, feeds, sleep, bottles. Every log is a data point.

I can build:
- **Analytics dashboard** - "How many feeds per day this week vs last week?"
- **Pattern detection** - "Zane always wakes up 2 hours after formula bottles"
- **Proactive alerts** - "It's been 3.5 hours since last feed"
- **Voice summaries** - "Hey Siri, how was Zane's night?" → AI reads the logs and summarizes

None of this needs Huckleberry anymore. I'm logging to *my* API first, which happens to *also* sync to Huckleberry. But the real data lives on my infrastructure now.

Eventually? I might not need Huckleberry at all. My webhook becomes the source of truth. My AI analyzes patterns. My shortcuts log everything. Huckleberry becomes optional—just another view of *my* data.

This is the future of apps: they're not gatekeepers anymore. They're optional interfaces to data you own.

Todo apps? Same thing. Build a simple webhook that captures tasks, syncs to Things or Todoist or wherever, but the real logic—the AI that prioritizes, the analysis that spots patterns, the automation that creates tasks—lives on *your* infrastructure.

Fitness apps. Finance apps. Habit trackers. Reading logs. Any app that's fundamentally just a database with a UI is now something you can build in an afternoon and extend infinitely.

The barrier to building these utilities is collapsing. It's not about replacing apps—it's about owning your data and building whatever analysis, automation, or intelligence you want on top.

That's the hope.

---

*Built in 6 hours. 847 lines of code written by AI. 0 lines written by me. For Zane, who doesn't care about the code, only that his diaper changes get logged.*

**The code:** [https://github.com/karim-alweheshy/baby-log-api](https://github.com/karim-alweheshy/baby-log-api)  
**The tools:** Python, FastAPI, Docker, Tailscale, iOS Shortcuts, Firebase Firestore  
**The real story:** A conversation with an AI that turned a 2 AM problem into a 3-tap solution.

👶
