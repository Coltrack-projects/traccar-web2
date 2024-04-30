import * as React from "react";
import {
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";

function NavigationBar() {
  return (
    <AppBar
      position="relative"
      sx={{ zIndex: 5, background: "rgb(42, 49, 65)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src="coltrack-horizontal.png" style={{
                height: '48px'
            }} />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
