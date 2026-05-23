import { Band } from "./questions";

export type DimensionCopy = {
  title: string;
  band: Band;
  heading: string;
  body: string;
};

const COPY: Record<number, Record<Band, { heading: string; body: string }>> = {
  1: {
    "finding-it-hard": {
      heading: "The inner critic is loud right now",
      body: "Your responses suggest that self-doubt is taking up a significant amount of space at the moment. That is not a character flaw, it is a very common experience in the early months of a new role, particularly when you care about doing it well. The questioning voice tends to be loudest before you have had time to build up evidence of what you can do here. What matters is not whether the doubt is there, but whether you are letting it make decisions for you.\n\nOne starting point: try noticing when the doubt is loudest. There is usually a pattern, and patterns are something we can work with.",
    },
    "in-the-middle": {
      heading: "Some doubt, but you are holding it",
      body: "There are moments where you question yourself, replaying decisions, wondering whether you are the right fit, but it does not seem to be overwhelming you. That is a reasonable place to be in the first six months. The doubt is part of the territory. The fact that you are still functioning through it matters more than the fact that it is there.",
    },
    "largely-settled": {
      heading: "A steady relationship with self-doubt",
      body: "You seem to be carrying the inevitable uncertainties of a new role without being knocked significantly off course by them. That is not complacency, it suggests a reasonable degree of self-trust. It is worth noticing what is allowing you to do that, because it is not something everyone finds easy at this stage.",
    },
  },
  2: {
    "finding-it-hard": {
      heading: "Confidence feels harder to access right now",
      body: "Confidence in a new role often goes quiet before it comes back. That does not mean it has gone, it usually means you have not yet accumulated enough evidence that you can handle what this role throws at you. That evidence comes, but it takes longer than most people expect.\n\nOne thing worth trying: keep a brief note of moments where you handled something well, even something small. The brain at this stage tends to discount those moments automatically. Writing them down makes them harder to ignore.",
    },
    "in-the-middle": {
      heading: "Confidence is there, but not always reliable",
      body: "There are areas where you feel clear about what you bring and how you show up, and others where it feels less certain. That inconsistency is normal at this stage. Confidence tends to consolidate as you get more evidence of what works for you here. The question is whether you are giving yourself credit for the moments where it does show up.",
    },
    "largely-settled": {
      heading: "You are showing up with confidence",
      body: "You seem reasonably settled in how you come across and what you offer. There is a groundedness in your responses that suggests you have a workable sense of who you are in this role. That does not mean there are no hard moments, but you appear to have access to your own confidence when you need it.",
    },
  },
  3: {
    "finding-it-hard": {
      heading: "Direction feels unclear",
      body: "Your responses suggest you are finding it hard to feel in control of your own direction at the moment, pulled between competing priorities, reactive rather than proactive, uncertain about what success actually looks like for you here. That is a difficult place to operate from. It makes everything feel provisional. Getting clearer on even one or two anchors — what matters most, what you are not willing to compromise on — can start to shift that.",
    },
    "in-the-middle": {
      heading: "Some clarity, but still finding your footing",
      body: "There are areas where you have a clear enough sense of direction, and others where things feel less settled. That is a reasonable description of most leaders in the first six months. You do not need a perfect plan at this stage. You just need enough of a sense of direction to make decisions without going round in circles. It sounds like you are partway there.",
    },
    "largely-settled": {
      heading: "You have a clear enough compass",
      body: "You seem to have a reasonable grip on what matters, where you are heading, and how to manage your own agenda. That clarity is useful at this stage, it makes it easier to say no, to stay steady when priorities shift, and to avoid being pulled in too many directions at once.",
    },
  },
  4: {
    "finding-it-hard": {
      heading: "Relationships and influence feel hard going right now",
      body: "Your responses suggest that the relational side of this role feels hard going or unfinished at the moment, whether that is building new connections, navigating upwards, or managing the shift with people who knew you before. Relationships are often the last thing to settle in a new role, and the pressure to get them right quickly can make them feel harder than they are. It is worth thinking about where even small investments might make a difference.",
    },
    "in-the-middle": {
      heading: "Building, but not yet fully landed",
      body: "Some of the relational foundations are in place, but there are areas that feel less secure, places where you are still finding your footing with people, or where you have not yet quite worked out how to show up. That is normal at this stage. Relationships in a new role take time to find their shape.",
    },
    "largely-settled": {
      heading: "Relationships are working for you",
      body: "You seem to have made good progress on the relational side of this role, building what you need, finding ways to influence effectively, and navigating some of the trickier dynamics that come with a transition. That takes deliberate effort, and it is easy to underestimate how much you have invested in getting there.",
    },
  },
};

export function getDimensionCopy(
  dimensionId: number,
  band: Band
): { heading: string; body: string } {
  return (
    COPY[dimensionId]?.[band] ?? {
      heading: "Results",
      body: "Your results for this dimension.",
    }
  );
}
