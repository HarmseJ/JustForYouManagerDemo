import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconPicker from "./IconPicker.components";
import { Box, TextField } from "@mui/material";
import { GlobalProvider } from "../global/GlobalProvider.global";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function TodaysPick(props: {
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
}) {
  const { handleClickOpen, handleClose, open } = props;

  const { setTitleAndIcon } = GlobalProvider();

  const [tempTitle, setTempTitle] = React.useState("");
  const [tempIcon, setTempIcon] = React.useState("");

  const handleIconSelect = (iconName: string) => {
    setTempIcon(iconName);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleAddOption = () => {
    setTitleAndIcon((prev: any) => [
      ...prev,
      { title: tempTitle, iconName: tempIcon },
    ]);

    handleClose();

    setTempTitle("");
    setTempIcon("");
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "rgb(69, 81, 121)",
          color: "white",
          fontWeight: "bold",
          fontSize: "0.9rem",
          margin: "10px",
        }}
      >
        Add Entry
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            backgroundColor: "rgb(69, 81, 121)",

            color: "white",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}

          id="customized-dialog-title"
        >
          <Typography variant="h6" component="div">
            Add Option
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent
          dividers
          sx={{
            backgroundColor: "rgb(106, 117, 134)",

          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            textAlign={"center"}
            alignItems={"center"}
            bgcolor={"rgba(0, 0, 0, 0.56)"}
            borderRadius={"10px 10px 0px 0px"}
            color={"black"}
            padding={"10px 0px"}
            component="form"
            width={"100%"}
            noValidate
            autoComplete="off"
          >
            <Typography
              fontFamily={"Roboto"}
              color="rgba(255, 255, 255, 0.75)"
              fontSize={"1.2rem"}>
              Title:
            </Typography>
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              multiline
              value={tempTitle}
              sx={{
                width: "50%",
                backgroundColor: "grey.500",
                borderRadius: "5px",
                marginTop: "10px",
              }}
              onChange={handleTitleChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              bgcolor: "rgba(70, 70, 70, 0.11)",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
              color: "black",
              borderRadius: "0px 0px 10px 10px",
              width: "100%",
            }}
          >
            <IconPicker onSelect={handleIconSelect} />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            backgroundColor: "rgb(69, 81, 121)",
          }}
        >
          <Button
            autoFocus
            onClick={handleAddOption}
            sx={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "1rem",
              color: "white",
            }}>
            Add
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}