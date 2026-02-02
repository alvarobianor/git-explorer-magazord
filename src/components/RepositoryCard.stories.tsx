import type { Meta, StoryObj } from "@storybook/react";
import {
  RepositoryCard,
  RepositoryCardHeader,
  RepositoryCardDescription,
  RepositoryCardStats,
} from "./RepositoryCard";

const meta = {
  title: "Components/RepositoryCard",
  component: RepositoryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: null,
  },
} satisfies Meta<typeof RepositoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[800px]">
      <RepositoryCard repoUrl="https://github.com/facebook/react">
        <RepositoryCardHeader owner="facebook" name="react" />
        <RepositoryCardDescription description="A declarative, efficient, and flexible JavaScript library for building user interfaces." />
        <RepositoryCardStats
          stars={205000}
          forks={165000}
          language="JavaScript"
        />
      </RepositoryCard>
    </div>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <div className="w-[800px]">
      <RepositoryCard repoUrl="https://github.com/vercel/next.js">
        <RepositoryCardHeader owner="vercel" name="next.js" />
        <RepositoryCardStats
          stars={105000}
          forks={25000}
          language="TypeScript"
        />
      </RepositoryCard>
    </div>
  ),
};

export const LongDescription: Story = {
  render: () => (
    <div className="w-[800px]">
      <RepositoryCard repoUrl="https://github.com/microsoft/vscode">
        <RepositoryCardHeader owner="microsoft" name="vscode" />
        <RepositoryCardDescription description="Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, Go) and runtimes (such as .NET and Unity)." />
        <RepositoryCardStats
          stars={150000}
          forks={20000}
          language="TypeScript"
        />
      </RepositoryCard>
    </div>
  ),
};

export const WithoutLink: Story = {
  render: () => (
    <div className="w-[800px]">
      <RepositoryCard>
        <RepositoryCardHeader owner="example" name="repository" />
        <RepositoryCardDescription description="This card doesn't have a link, so it won't redirect when clicked." />
        <RepositoryCardStats stars={1200} forks={350} language="JavaScript" />
      </RepositoryCard>
    </div>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div className="w-[800px] space-y-0">
      <RepositoryCard repoUrl="https://github.com/facebook/react">
        <RepositoryCardHeader owner="facebook" name="react" />
        <RepositoryCardDescription description="A declarative, efficient, and flexible JavaScript library for building user interfaces." />
        <RepositoryCardStats
          stars={205000}
          forks={165000}
          language="JavaScript"
        />
      </RepositoryCard>
      <RepositoryCard repoUrl="https://github.com/vercel/next.js">
        <RepositoryCardHeader owner="vercel" name="next.js" />
        <RepositoryCardDescription description="The React Framework for Production" />
        <RepositoryCardStats
          stars={105000}
          forks={25000}
          language="TypeScript"
        />
      </RepositoryCard>
      <RepositoryCard repoUrl="https://github.com/microsoft/vscode">
        <RepositoryCardHeader owner="microsoft" name="vscode" />
        <RepositoryCardDescription description="Visual Studio Code" />
        <RepositoryCardStats
          stars={150000}
          forks={20000}
          language="TypeScript"
        />
      </RepositoryCard>
    </div>
  ),
};
