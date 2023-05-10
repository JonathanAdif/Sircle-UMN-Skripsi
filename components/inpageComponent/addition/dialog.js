import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FollowStatList from "./followStatList";
import Dialog from "@mui/material/Dialog";

function DialogData({ title, stat, scroll, open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        {stat.length > 0 &&
          stat.map((follow) => (
            <FollowStatList
              key={follow?.id}
              listAvatar={follow?.profiles?.avatar}
              listUsername={follow?.profiles?.username}
              // profileFollow={follow.user_id}
              // myFollowstat={follow.user_id === myProfile?.id}
            />
          ))}
      </DialogContent>
    </Dialog>
  );
}

export default DialogData;
