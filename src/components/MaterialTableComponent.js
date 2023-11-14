import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import moment from "moment";
import 'moment/locale/th';
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useCookies } from "react-cookie";
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import moment from "moment";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import {DateTimePicker,LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


function MaterialTableComponent() {

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const [update,setUpdate] = useState(0);
  // CONFIG TABLE
  const [columns, setColumns] = useState([
    //{ title:"ID", field: "id", editable: "never", hidden: true},
    { title: "กิจกรรม", field: "name" },
    {
      title: "วัน",
      field: "datetime",
      type: "datetime",
      render: (data) => {
        //console.log(data.date);
        return dayjs(data.datetime).format('lll');
      },

      editComponent: ({ value, onChange }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="th">
      <DateTimePicker
        label="Controlled picker"
        value={dayjs(value)}
        onChange={(newValue) => onChange(newValue)}
      /></LocalizationProvider>
      ),
    }
  ]);

  // get variables from auth provider
  const { username, token, logout } = useAuth(); // เอา token มาใช้เวลา call api

  const [data, setData] = useState();

  const defaultMaterialTheme = createTheme();
  let [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    // Data Shape: id (INT), userId (STR), name (STR), when (STR in DATETIME format), user (คือรัย)

    // axios
    //   .get(`https://localhost:7294/Activities/`, {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //       timeout: 10 * 1000,
    //     },
    //   })
    //   .then((response) => {
      // แก้ให้แยก date time เพิ่ม
    //     setData(response.data);
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     if (error.code === "ECONNABORTED") {
    //       console.log("timeout");
    //     } else {
    //       console.log(error.response.status);
    //       console.log(error);
    //     }
    //   });
    setData([{id:123, userId:1234, name:"kill myself", datetime:"2022-04-17T15:30", user:"test"},
             {id:124, userId:1234, name:"now", datetime:'2022-04-17T15:50', user:"test"}])


  }, [update]);

  const rowUpdateHandler = (data) => {
    data.datetime = dayjs(data.datetime).format("YYYY-MM-DDTHH:mm:ss");
    var addRow = {name:data.name, datetime:data.datetime}
    // อันนี้ไม่รู้ว่า API มันรับค่าทั้งตารางได้มั้ย หรือมะปรางเขียนให้มันทำได้มั้ย อันนี้เขียนเป็นตัวอย่างไว้ ไม่แน่ใจต้องแก้เพิ่มยังไง
    console.log(`Updating id: ${data.id}`);
    console.log(addRow);
    axios
      .put(`https://localhost:7294/Activities/${data.id}`, {
        headers: {
          Authorization: "Bearer " + token,
          timeout: 10 * 1000,
        },
        body: {addRow},
      });
      setUpdate(update+1);
  };



  const rowAddHandler = (data) => {
    
    data.datetime = dayjs(data.datetime).format("YYYY-MM-DDTHH:mm:ss");
    var addRow = {name:data.name, datetime:data.datetime}
    console.log(addRow);
    axios
    .post(`https://localhost:7294/Activities/`, {
          headers: {
            Authorization: "Bearer " + token,
            timeout: 10 * 1000,
          },
          body: {addRow}}
    );
    setUpdate(update+1);
  };

  const rowDeleteHandler = (data) => {
    // อันนี้ไม่รู้ว่า API มันรับค่าทั้งตารางได้มั้ย หรือมะปรางเขียนให้มันทำได้มั้ย อันนี้เขียนเป็นตัวอย่างไว้ ไม่แน่ใจต้องแก้เพิ่มยังไง
    console.log(`Deleting id: ${data.id}`);
    axios
    .delete(`https://localhost:7294/Activities/${data.id}`, {
      headers: {
        Authorization: "Bearer " + token,
        timeout: 10 * 1000,
      }
    }
    );
    setUpdate(update+1);
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          icons={tableIcons}
          title="To Do"
          columns={columns}
          data={data}
          editable={{
            isEditable: (rowData) => true,
            //isEditHidden: rowData => rowData.name === 'x',
            isDeletable: (rowData) => true,
            //isDeleteHidden: rowData => rowData.name === 'y',
            onBulkUpdate: (changes) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /*setData([...data,newData]);*/ //อันนี้ไม่ implement ก่อน
                  resolve();
                }, 1000);
              }),
            onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
            onRowUpdateCancelled: (rowData) =>
              console.log("Row editing cancelled"),
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  rowAddHandler(newData);
                  //
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data]; //ก็อปปี้ขอ้มลูเดิม(data)มาเป็นอารเ์รยช์ดุใหม่
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  rowUpdateHandler(newData);
                  //SET TABLE ใน DATABASE ด้วย [...dataUpdate]
                  // ก็เหมือนเดิม จะคอลในนี้หรือใช้ฟังก์ชั่น rowUpdateHandler ก็ได้
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data]; //ก็อปปี้ขอ้มลูเดิม(data)มาเป็นอารเ์รยช์ดุใหม่
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                  //SET TABLE ใน DATABASE ด้วย [...dataDelete]
                  // ก็เหมือนเดิม จะคอลในนี้หรือใช้ฟังก์ชั่น rowUpdateHandler ก็ได้
                  rowDeleteHandler(oldData);
                  resolve();
                }, 1000);
              }),
          }}
        ></MaterialTable>
      </ThemeProvider>
    </div>
  );
}

export default MaterialTableComponent;
