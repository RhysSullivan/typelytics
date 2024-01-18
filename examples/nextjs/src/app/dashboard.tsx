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
import { AnalyticsQueries } from "./page";
import { Chart } from "@typelytics/tremor";

const tenNames = [
  "Aidan",
  "Aiden",
  "Alexander",
  "Andrew",
  "Anthony",
  "Asher",
  "Benjamin",
  "Caleb",
  "Carter",
  "Christopher",
  "Daniel",
  "David",
  "Elijah",
  "Ethan",
  "Gabriel",
  "Grayson",
  "Henry",
  "Isaac",
  "Jack",
  "Jackson",
  "Jacob",
  "James",
  "Jaxon",
  "Jayden",
  "John",
  "Joseph",
  "Joshua",
  "Josiah",
  "Levi",
  "Liam",
  "Lincoln",
  "Logan",
  "Lucas",
  "Luke",
  "Mason",
  "Matthew",
  "Michael",
  "Muhammad",
  "Noah",
  "Oliver",
  "Owen",
  "Samuel",
  "Sebastian",
  "Theodore",
  "Thomas",
  "William",
];

export function DashboardExample(props: { data: AnalyticsQueries }) {
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
              <Card>
                <Chart {...props.data.pageViewsByBrowser} />
              </Card>
              <Card>
                <Chart {...props.data.pageViews} />
              </Card>
            </div>
            <div className="mt-6 ">
              <Card>
                <Chart
                  type={props.data.questionsAskedByUser.type}
                  data={props.data.questionsAskedByUser.data.slice(0, 10)}
                />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
