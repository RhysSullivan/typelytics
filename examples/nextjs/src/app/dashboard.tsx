"use client";

import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Title,
} from "@tremor/react";
import { Chart } from "@typelytics/tremor";

export function DashboardExample(props: { data: React.ReactNode }) {
  return (
    <main className="p-12">
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-6">
              <Card>{props.data}</Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
