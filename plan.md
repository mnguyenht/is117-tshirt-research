# Standard Issue: Plan (IS117-007)

Step 2 of the T-shirt record. It builds on the [Research](./) page and the brand decisions in the [Brand Studio record](https://github.com/mnguyenht/is117-brand-assignment/blob/main/SPEC.md).

**Status, 2026-11-17:** AI draft from the research, SPEC.md and the store's code. The learner's own decisions are marked, including the approach choice (A). Still open: a classmate's review of one story.

**Goal:** Alex picks a size, sees one honest total and finishes a demo order without a sales pitch or fine print. The order is saved in SQLite and is still there after a restart.

## Brand brief, carried forward

| Decision | Record |
| --- | --- |
| Audience and need | Alex, a budget shopper replacing worn-out white tees worn most days. Wants a shirt that is "reliable while being cheap" and "just a plain white T-shirt" (learner's words). A hypothesis, not validated with real shoppers. |
| Promise | "A white T-shirt is a white T-shirt. But it'll be a good white T-shirt." (learner's words). "Good" stays general: no quality claims we cannot support. |
| Character and voice | Everyman. Voice: curious, assured, plainspoken. |
| Visual source and idea | Wolfgang Weingart, [_Kunsthalle Basel Kunstkredit 76-77_](https://www.moma.org/collection/works/101455) (1977, MoMA): layered, mixed visual languages. Translated into kraft paper, a crate stamp, label-maker tape and a hang tag, so the shirt reads like stock taken off a shelf. Peer issue [#3](https://github.com/mnguyenht/is117-tshirt-research/issues/3) asked to keep this look. |
| Logo and style guide | [Crate-stamp wordmark](https://github.com/mnguyenht/is117-brand-assignment/blob/main/public/assets/standard-issue-wordmark.svg) · [live style guide](https://standard-issue-is117.vercel.app/styleguide.html) |
| Price | $15, a fictional demo price (learner's decision after peer issue [#4](https://github.com/mnguyenht/is117-tshirt-research/issues/4)). The live store still shows $28 until that change ships. |

## Two honest persuasion elements

| Element on the page | How it helps Alex | Limit |
| --- | --- | --- |
| **Reciprocity:** "How to wear it." Three free styling tips, labelled "Free tip, no purchase needed". | Useful advice given before any ask. | Says nothing about the shirt itself. Effect not measured. |
| **Liking:** "This is a white T-shirt, nothing more or less." above the size picker. | Speaks Alex's own no-hype attitude back to them. | A description, not a claim. Effect not measured. |

No reviews, scarcity, countdowns, pre-ticked boxes or added fees. The research found each of these in at least one competitor's checkout.

## Two approaches

Both serve the same goal with the same offer, stories, data and order code. They differ in page order and in where checkout happens.

| | A: One shelf (shop first) | B: The receipt (total first) |
| --- | --- | --- |
| Idea | Everything needed to decide is on the shop page: price, sizes, fit table, bag. Checkout stays three short steps: Shipping, Review, Done. | The shop page reads as one long receipt: the shirt, $15, size and fit, the running total, then the shipping form and the confirmation stamp on the same page. |
| Why it could work for Alex | Few choices on one page, in an order shoppers already know. | The total stays in view all the way down, so nothing new appears late. The research found fees, pitches or timers between bag and checkout at Muji, Everlane and Quince. |
| Peer feedback it answers | [#1](https://github.com/mnguyenht/is117-tshirt-research/issues/1): fit help next to the size picker | [#2](https://github.com/mnguyenht/is117-tshirt-research/issues/2): make the fee-free checkout the visible advantage |
| Reuses | The current shop, checkout, payment and order pages | The shop page, cart rules and order code. Replaces three checkout pages with one section. |
| Risk | Fit and help details make the shop page longer. Checkout adds two page loads. | A long page on a phone. One long form is harder to keep clear and accessible. A bigger rewrite. |

**How to compare them:** on a 375 px phone view, count the pages and taps from landing to a confirmation for one shirt in M.

**Chosen approach:** A, One shelf (learner's choice, 2026-11-17). Reason, learner's words: "It feels more like a user flow. That would help contrast the boldness of the proposed research direction."

## User stories, features and checks

| # | Story | Essential feature | Observable check | Today |
| --- | --- | --- | --- | --- |
| S1 | As Alex, I want the price and a fit guide beside the size choices, so I can pick a size without guessing. | $15 price, four labelled sizes (S, M, L, XL), and a fit table of sample measurements marked "demo". | At 375 px wide, the price, four sizes and fit table are all on the shop page. Pressing "Add to demo bag" with no size shows "Please pick a shirt size." and the bag count stays at 0. | Price, sizes and the missing-size message exist. Fit table to build. |
| S2 | As Alex, I want my bag to show each size, its quantity and one total, with nothing added for me, so the total is what I expect. | Bag lines with quantities, a total of $15 × shirts, free demo shipping. No add-ons, fees or pre-ticked boxes. | Add M twice and L once: the bag shows M × 2, L × 1 and $45.00. On checkout, no checkbox starts ticked and the total is still $45.00. | Exists. Recheck at $15. |
| S3 | As Alex, I want a demo checkout that asks only for what it needs and says plainly that it is a demo, so I can finish without worry. | Name, address and email checked before submit. "Demo checkout" label, no card fields, a confirmation with an order reference. | Submit with the email empty: the email field is named in the error and no order is saved. Fill every field using `alex@example.test`: a confirmation shows a reference, and the payment step has no card inputs. | Exists in live mode, behind sign-in. Guest checkout in local mode to build. |
| S4 | As the store owner, I want each demo order saved in SQLite by the server, so it survives a restart and its total cannot be changed in the browser. | Local server with an order API backed by Node's built-in SQLite. The server sets the price itself. | Place an order and note the reference. Stop the server (Ctrl+C), start it again, open order history: the same reference and total are there. A request that claims a $1 total still saves $15 per shirt. | To build. |
| S5 | As Alex, I want delivery, returns and contact details before I pay, so I know what happens after I order. | A Help page, linked from the shop and checkout, with delivery, returns and contact sections, each labelled as a fictional demo policy. | From the shop and from checkout, one click opens Help, and all three sections are there with the "demo" label. | To build. |

**Essential:** S1 to S5. Together they cover the six store requirements: understand the offer, choose a shirt, review the purchase, finish a demo checkout, see data work, and find help.

## Simulated checkout and the SQLite backend

- **Public mode:** live Supabase backend (Postgres) for accounts and orders, as built in BRAND-002. Sign-in is required. Vercel cannot keep a SQLite file between requests, so SQLite runs locally.
- **Local start:** `npm run dev` in the [brand repo](https://github.com/mnguyenht/is117-brand-assignment). Orders are stored in SQLite at `data/standard-issue.db`, which is git-ignored. Guest checkout, no account needed.
- **Server rules:** the same limits as the browser's cart rules: sizes S, M, L and XL; 1 to 10 of a size and 20 shirts in total; $15 a shirt, computed on the server. Anything else is refused with a plain message. The server listens on 127.0.0.1 only.
- **Saved per order:** reference, sizes and quantities, shirt count, total, and the time. The email is checked but not saved.
- **No payment:** no card fields and no payment provider. Every checkout page carries a demo label.
- **States to handle:** empty bag, no size chosen, a missing or invalid field, saving, saved (with reference), and server not running ("Order not saved. Is the server running?").
- **Checked, 2026-11-17:** Node's built-in SQLite (`node:sqlite`) created a table, inserted an order row and read it back on this machine's Node 22.23.2, with no package to install. Node 22 prints an "experimental feature" warning. The course starter uses Node 24.

## Deferred

- Real payment, shipping and returns.
- Guest checkout on the public site: it needs a change to the database's sign-in rule.
- Model height and size worn (peer issue [#1](https://github.com/mnguyenht/is117-tshirt-research/issues/1)): there is no real model photo. The fit table of labelled sample measurements covers fit for now.
- Multipacks, discount codes and other colours.
- Anything aimed at Fiona: she needs origin facts the store does not have.

## Limits

- Alex and Fiona are hypotheses, not interviews.
- Fit measurements and help policies will be fictional and labelled as demo.
- Neither persuasion effect has been measured.
- SQLite runs only on the local server.

## Feedback and AI use

- **Feedback:** peer issues on this plan go in this repo and are logged in [Feedback and decisions](./#feedback-and-decisions) on the Research page.
- **AI use:** Claude (an AI assistant) drafted this page from the research page, SPEC.md and the store's code, and ran the SQLite check above. The audience, promise, voice, price and visual direction are the learner's earlier decisions. The approach choice is the learner's.
