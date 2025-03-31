import { Box, Button, Container, Paper, Typography } from '@mui/material';
import CustomTextField from './components/CustomTextField.components';
import TodaysPick from "./components/TodaysPick.components";
import { useReducer, useState } from "react";
import * as MuiIcons from "@mui/icons-material";
import { GlobalProvider } from './global/GlobalProvider.global';
import SelectDay from './components/SelectDay.components';

function App() {
  const { titleAndIcon } = GlobalProvider();
  const [open, setOpen] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const Icons = MuiIcons as Record<string, MuiIcons.SvgIconComponent>;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      bgcolor={"white"}
      padding={"5px 0px"}
      margin={0}
      width={"100vw"}
      maxWidth={"100vw"}
      minHeight={"100vh"}
      height={"fit-content"}
      color={"black"}
      textAlign={"center"}
      gap={3}
    >
      {/* what day */}
      <Box>
        <Typography>
          Select Day to Show:
        </Typography>
        <SelectDay />
      </Box>

      {/* image URL */}
      <Box>
        <CustomTextField location='image' />
      </Box>

      {/* title */}
      <Box>
        <CustomTextField location='title' />
      </Box>

      {/* message */}
      <Box>
        <CustomTextField location='message' />
      </Box>

      {/* today's pick(s) */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"rgba(200, 200, 200, 0.32)"}
        color={"black"}
        border={"1px solid #ccc"}
        width={"80%"}
        height={"fit-content"}
        gap={2}
        borderRadius={2}
        boxShadow={3}
      >
        <Typography textAlign={"center"}>
          Add a Pick Entry
        </Typography>

        <TodaysPick
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        />

        {titleAndIcon.length > 0 && (
          <Container maxWidth="sm" sx={{ padding: "16px", color: "transparent" }}>
            <Paper sx={{
              backgroundColor: "rgba(200, 200, 200, 0.32)",
              borderRadius: 12,
            }}>
              <Typography variant="h6" align="center" gutterBottom>
                My Entries
              </Typography>
              <Box p={2} display="flex" justifyContent="center" alignItems="center" gap={2}>
                {titleAndIcon.map((pick, index) => {
                  const IconComponent = Icons[pick.iconName];
                  return (
                    <>
                      <Box
                        key={index}
                        bgcolor={"rgba(180, 96, 57, 0.24)"}
                        borderRadius={5}
                        alignItems={"center"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        width={"fit-content"}
                        height={"fit-content"}
                        padding={"10px"}
                      >
                        {IconComponent ?
                          <>

                            <IconComponent fontSize="large" />
                            {pick.title}
                          </>
                          :
                          null
                        }
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            titleAndIcon.splice(index, 1);
                            forceUpdate();
                          }}
                          sx={{
                            width: "80%",
                            backgroundColor: "rgba(230, 16, 16, 0.43)",
                            color: "white",
                            fontSize: "0.9rem",
                            marginTop: "10px",
                            padding: "0px 20px",
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </>
                  );
                })}
              </Box>
            </Paper>
          </Container>
        )}
      </Box>

      {/* submit button */}
      <Box>
        <Button
          variant='contained'
          color='primary'
          sx={{
            backgroundColor: "rgb(58, 58, 58)",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.9rem",
            margin: "10px",
          }}
          onClick={() => { }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default App;