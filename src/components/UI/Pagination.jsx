import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";

const Pagination = ({ setPageItems, items }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(10);

  useEffect(() => {
    setCount(Math.ceil(items.length) || 0);
    setPage(0)
    handleChangePage("event", 0);
  }, [rowsPerPage,items]);



  const handleChangePage = (event, newPage) => {
    setPage(+newPage);
    const begin = (newPage + 1) * rowsPerPage - rowsPerPage;
    const end =(newPage + 1) * rowsPerPage;
    const newItems = items;
    setPageItems(newItems.slice(begin, end));
    // console.log("begin",begin,"end",end,"page",newPage,"newpageitems",newItems,"items",items)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TablePagination
    sx={{marginTop:"10px"}}
      labelRowsPerPage="Products per page"
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
