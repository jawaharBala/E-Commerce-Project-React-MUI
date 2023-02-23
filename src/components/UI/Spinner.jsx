import {CircularProgress,Box} from "@mui/material";
const Spinner = () => {
  return (
    <div style={{marginRight:'25%', marginLeft:'25%',marginTop:'auto', marginBottom:'auto'}}>
      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Spinner;
