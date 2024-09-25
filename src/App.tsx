import { Box } from "@mui/material"
import "./App.css"
import MainTabs from "./components/MainTabs"
import UsageFrequency from "./pages/UsageFrequency"
import RoutePrediction from "./pages/RoutePrediction"
import UsageStatistics from "./pages/UsageStatistics"
import EntryStatistics from "./pages/EntryStatistics"

export default function App(){
    return (
        <Box sx={{ p: 5 }}>
            <MainTabs
                tabData={[
                    {
                        tabName: "利用量統計", 
                        element: <UsageStatistics/>
                    },
                    {
                        tabName: "経路予測", 
                        element: <RoutePrediction/>
                    },
                    {
                        tabName: "利用頻度", 
                        element: <UsageFrequency/>
                    },
                    {
                        tabName: "エントリー統計", 
                        element: <EntryStatistics/>
                    }
                ]}
            />
        </Box>
    )
}
