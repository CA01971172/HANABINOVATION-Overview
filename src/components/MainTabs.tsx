import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

type TabData = {
    tabName: string;
    element: React.ReactNode;
}

export default function MainTabs(props: { tabData: TabData[]}) {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tabIndex}
                    onChange={(_event: React.SyntheticEvent, newValue: number) => {
                        setTabIndex(newValue)
                    }}
                >
                    {props.tabData.map((tab, index) => (
                        <Tab key={index} label={tab.tabName}/>
                    ))}
                </Tabs>
            </Box>
            {props.tabData.map((tab, index) => (
                (tabIndex === index) && (
                    <Box key={index} style={{height: "80vh"}}>
                        {tab.element}
                    </Box>
                )
            ))}
        </Box>
    );
}
