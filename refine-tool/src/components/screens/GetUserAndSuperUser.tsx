import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  
  const GetUserAndSuperuser = ({ superusers, users }:any) => {
    return (
      <Box sx={{ mt: 5,p:3 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", textDecoration: "underline" }}
        >
          User and Superuser List
        </Typography>
  
        {/* Superusers Table */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Superusers
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx = {fontBold}>Name</TableCell>
                <TableCell sx = {fontBold}>Email</TableCell>
                <TableCell sx = {fontBold}>Phone</TableCell>
                <TableCell sx = {fontBold}>City</TableCell>
                <TableCell sx = {fontBold}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {superusers &&
                superusers.map((superuser:any) => (
                  <TableRow key={superuser._id}>
                    <TableCell >{superuser.name}</TableCell>
                    <TableCell >{superuser.email}</TableCell>
                    <TableCell >{superuser.phone}</TableCell>
                    <TableCell >{superuser.city}</TableCell>
                    <TableCell >{superuser.role}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Users Table */}
        <Typography variant="h6" sx={{ mt: 2 }}>
          Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx = {fontBold}>Name</TableCell>
                <TableCell sx = {fontBold}>Email</TableCell>
                <TableCell sx = {fontBold}>Phone</TableCell>
                <TableCell sx = {fontBold}>City</TableCell>
                <TableCell sx = {fontBold}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user:any) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  const fontBold ={
      fontWeight:"bold"
  }
  
  
  export default GetUserAndSuperuser;
  