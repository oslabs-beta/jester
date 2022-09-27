import React from "react";
import { Box } from "@mui/material";
import { NavPanel } from "../components/NavPanel";
import { ProjectPanel } from "../components/ProjectPanel";
import { HistoryPanel } from "../components/HistoryPanel";

export const NavPanelContainer = () => {
  return(
    <Box sx={{display: 'flex', flexDirection:'row'}}>
      <NavPanel />
      <HistoryPanel />
      <ProjectPanel />
    </Box>
  )

}