import { BosuanPage } from './bosuan/bosuan';
import { CommunityPage } from './community/community';
import { FriendsPage } from './user-friends/friends';
import { TabsPage } from './tabs/tabs';
import { TutorialPage } from './tutorial/tutorial';

import { MyPage } from './user-center/my';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = BosuanPage;
export const Tab2Root = CommunityPage;
export const Tab3Root = FriendsPage;
export const Tab4Root = MyPage;
