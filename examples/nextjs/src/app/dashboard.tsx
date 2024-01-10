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
import { Chart } from "@typecharts/tremor";

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
            </div>
            <div className="mt-6 max-w-[400px]">
              <Card>
                <Chart
                  type={props.data.questionsAskedByUser.type}
                  data={props.data.questionsAskedByUser.data.slice(0, 10)}
                  skipLabel
                  renderCell={{
                    "Answer Overflow Account Id": ({ value }) => {
                      return (
                        <div className="flex items-center">
                          <img
                            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${value}`}
                            alt="avatar"
                            className="max-w-[48px]"
                          />
                          <span className=" text-xl">
                            {tenNames[Number(value) % tenNames.length]}
                          </span>
                        </div>
                      );
                    },
                    value: ({ value }) => (
                      <span className="text-xl">{value}</span>
                    ),
                  }}
                  renderHeader={{
                    value: "Questions Asked",
                    "Answer Overflow Account Id": "User",
                  }}
                />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
