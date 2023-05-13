import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FollowStatList from "./followStatList";
import Dialog from "@mui/material/Dialog";
import { useContext } from "react";
import { globalContext } from "@/context/globalContext";
import IconButton from "@mui/material/IconButton";

// icon
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function DialogData({ title, stat, scroll, open, handleClose, fstat }) {
  const { myUser } = useContext(globalContext);

  const userList = stat?.map((follow) => `${follow?.profiles?.email}`);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      {!myUser && stat?.length && (
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      )}
      {myUser && stat && (
        <DialogTitle
          id="scroll-dialog-title"
          className="flex flex-row justify-between items-center"
        >
          {title}
          <a href={`mailto:${userList}`} target="_blank">
            <IconButton color="primary" aria-label="edit" component="label">
              <EmailOutlinedIcon
                className=" !text-birulogo-sr"
                sx={{ fontSize: { xs: 20, lg: 25 } }}
              />
            </IconButton>
          </a>
        </DialogTitle>
      )}
      {fstat && <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>}
      <DialogContent dividers={scroll === "paper"}>
        {stat?.length > 0 &&
          stat.map((follow) => (
            <FollowStatList
              key={follow?.id}
              listAvatar={follow?.profiles?.avatar}
              listUsername={follow?.profiles?.username}
              profileFollow={follow?.user_id}
              onClose={handleClose}
            />
          ))}
        {fstat?.length > 0 &&
          fstat.map((followss) => (
            <FollowStatList
              key={followss?.id}
              listAvatar={followss?.profiles?.avatar}
              listUsername={followss?.profiles?.username}
              profileFollow={followss?.followers_id}
              onClose={handleClose}
            />
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default DialogData;
