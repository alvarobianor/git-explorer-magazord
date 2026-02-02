import type { Meta, StoryObj } from "@storybook/react";
import {
  UserProfile,
  UserProfileAvatar,
  UserProfileHeader,
  UserProfileInfo,
  UserProfileStats,
} from "./user-profile";

const meta = {
  title: "Components/UserProfile",
  component: UserProfile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <UserProfile>
      <UserProfileAvatar
        src="https://avatars.githubusercontent.com/u/69631?v=4"
        alt="facebook"
        fallback="FB"
      />
      <UserProfileHeader
        name="Meta"
        bio="We are working to build community through open source technology. NB: members of the Meta GitHub org are not necessarily employed by Meta."
        role=""
      />
      <UserProfileInfo
        company="Meta"
        location="Menlo Park, California"
        website="https://opensource.fb.com"
        email="opensource@meta.com"
        x="MetaOpenSource"
        instagram="meta"
      />
      <UserProfileStats />
    </UserProfile>
  ),
};

export const WithoutAvatarImage: Story = {
  render: () => (
    <UserProfile>
      <UserProfileAvatar src="" alt="Anonymous" fallback="AN" />
      <UserProfileHeader
        name="Anonymous User"
        bio="This user prefers to stay anonymous."
      />
      <UserProfileInfo location="Unknown Location" />
      <UserProfileStats />
    </UserProfile>
  ),
};
