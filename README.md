Advanced Horizontal Timeline Component

[Documentation](https://evaficy.com/advanced-horizontal-timeline-component-documentation) | [Live demo](https://components.evaficy.com/?path=/story/dynamic-components--timeline-demo)

Overview\
The Advanced Horizontal Timeline Component is a powerful, interactive React component that displays events in a beautiful horizontal timeline format.\
It features smooth animations, drag-and-drop functionality, customizable styling, and rich content support including images, descriptions, tags, and custom components.

Features\
🎯 Interactive Navigation: Arrow buttons, bullet navigation, and drag-and-drop support\
📱 Responsive Design: Works seamlessly on desktop and mobile devices\
🎨 Customizable Styling: Configurable colors, dimensions, and layouts\
🖼️ Rich Media Support: Images with zoom effects, captions, and alt text\
📝 Flexible Content: Short descriptions, expandable full descriptions, and tags\
🧩 Custom Components: Embed custom React components within timeline cards\
⚡ Smooth Animations: CSS transitions and hover effects\
♿ Accessibility: Keyboard-focusable controls with screen reader labels

## Installation

```bash
# Using npm
npm install @evaficy/react-horizontal-timeline lucide-react

# Using yarn
yarn add @evaficy/react-horizontal-timeline lucide-react
```

Peer dependencies: `react` and `react-dom` (16.8 or higher) and `lucide-react` (used for the arrow icons).

## Usage

```jsx
import { HorizontalTimeline } from '@evaficy/react-horizontal-timeline';
import '@evaficy/react-horizontal-timeline/dist/index.esm.css';

const events = [
  {
    dateTime: '2024-01-15T10:00:00Z',
    title: 'Project Launch',
    shortDescription: 'Successfully launched our new product.',
    description: 'The full story, shown when the reader clicks "Read More".',
    image: 'https://example.com/launch.jpg',
    imageAlt: 'Team celebrating the launch',
    imageCaption: 'Launch event',
    tags: ['Launch', 'Milestone'],
  },
  {
    dateTime: '2024-03-22T14:30:00Z',
    title: 'Version 2.0',
    shortDescription: 'Released version 2.0 with new features.',
  },
];

function App() {
  return <HorizontalTimeline events={events} accentColor="#1976d2" />;
}
```

## Styling

The styles ship as a separate CSS file. Import it once, for example in your app entry or root component:

```javascript
import '@evaficy/react-horizontal-timeline/dist/index.esm.css';
```

The stylesheet is built with Tailwind CSS and contains the utility classes the component uses, plus Tailwind's base styles.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `events` | `TimelineEvent[]` | `[]` | Events to display, in order |
| `cardWidth` | `number` | `320` | Card width in px |
| `cardHeight` | `number` | `400` | Card minimum height in px |
| `spacing` | `number` | `20` | Space between cards in px |
| `showBullets` | `boolean` | `true` | Show bullet navigation |
| `showArrows` | `boolean` | `true` | Show previous/next arrows |
| `autoPlay` | `boolean` | `false` | Move to the next card automatically |
| `autoPlayInterval` | `number` | `3000` | Auto-play interval in ms |
| `dragEnabled` | `boolean` | `true` | Allow dragging/swiping the timeline |
| `backgroundColor` | `string` | `'#f5f5f5'` | Timeline background color |
| `accentColor` | `string` | `'#1976d2'` | Color of the line, date badges, bullets, tags and buttons |
| `customComponents` | `{ [index: number]: ReactNode }` | `{}` | Extra content per card, keyed by event index |

## Event Object

| Field | Type | Description |
|---|---|---|
| `dateTime` | `string \| number \| Date` | Date shown on the card badge (required) |
| `title` | `ReactNode` | Card title (required) |
| `shortDescription` | `ReactNode` | Always visible under the title |
| `description` | `ReactNode` | Shown when "Read More" is clicked |
| `image` | `string` | Image URL |
| `imageAlt` | `string` | Image alt text (defaults to `title`) |
| `imageCaption` | `ReactNode` | Caption shown over the image |
| `tags` | `ReactNode[]` | Tags shown at the bottom of the card |
| `backgroundColor` | `string` | Card background color (default `'#ffffff'`) |

## TypeScript

Type declarations ship with the package (`HorizontalTimelineProps`, `TimelineEvent`).

## Changelog

- **1.1.0** - Stylesheet is now built from the component source on every release; TypeScript declarations included; screen reader labels on navigation buttons; `lucide-react` declared as a peer dependency (it was always required); unused Material UI peer dependencies and the build tool runtime dependency removed; build tooling updated.
- **1.0.8** - Funding link; styling notes in README.
