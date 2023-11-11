import MaterialTable from 'material-table' 
import{ThemeProvider,createTheme}from'@mui/material';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward';
 import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft';
 import ChevronRight from '@material-ui/icons/ChevronRight';
  import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
 import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import moment from "moment";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

//import moment from "moment";
import { KeyboardTimePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function MaterialTableComponent() {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />), DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />), Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />), FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />), LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />), NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />), PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />), ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />), Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />), ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />), ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        }
        
        // CONFIG TABLE
    const [columns, setColumns] = useState([
        { title: 'Activity', field: 'name' },
        { title: 'Date', field: 'date', type: 'date',
        render: (data) => {
         //console.log(data.date);
          return moment(data.date).format("LL");
        },

        editComponent: ({ value, onChange }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin='normal'
              id="date-picker-dialog"
              value={value}
              onChange={onChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        )
        },

        { title: "Time", field: "time", type: "time", 
        render: (data) => {
        console.log(data.time);
          return moment(data.time).format("hh:mm A");
        },
        editComponent: ({ value, onChange }) => (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              margin='normal'
              id="time-picker"
              value={value}
              onChange={onChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>
        )},
        ]);





    // get variables from auth provider
    const { username, token, logout } = useAuth(); // เอา token มาใช้เวลา call api
    
    const [data, setData] = useState();


    const defaultMaterialTheme = createTheme()
    
    useEffect(() => {
        // เขียนโค้ด Fetch Data จาก database ด้วย API ตรงนี้ แล้วเอาไปเซ็ทแบบข้างล่าง
        // อันนี้คือมันจะรันตอนเปิดเว็บทีเดียว เพื่อดึง data จาก database มาแสดงในตาราง
        // 
        // เวลา query คือใข้ variable {token} คือสตริงค่า salt ที่เซ็ทจากหน้า login เอาไว้ query ตาม user เก็ตแหละ
        // ประมาณแบบ
        // Axios.get('http://localhost:3000/activities').then((response) => {
        //     setData(response.data); ไม่รู้ต้องปรับ data type json ไรอีกมั้ย ให้มันเป็น Array ของ object หน้าตาแบบข้างล่าง
        // });
        // อันนี้ตัวอย่าง 2 record
        setData([
        { name: 'Swimming', date: '08-30-2020', time:'Sat Nov 11 2023 17:18:03 GMT+0700 (Indochina Time)' },
        { name: 'Running', date: '08-30-2020', time:'Sat Nov 11 2023 17:18:03 GMT+0700 (Indochina Time)'},
        ])
  }, []);

    const rowUpdateHandler = (data) => { // อันนี้ไม่รู้ว่า API มันรับค่าทั้งตารางได้มั้ย หรือมะปรางเขียนให้มันทำได้มั้ย อันนี้เขียนเป็นตัวอย่างไว้ ไม่แน่ใจต้องแก้เพิ่มยังไง
      axios.put(`http://localhost:3000/activities/${data.id}`, data)
      .then((response) => {
        console.log(response);
      }
      )
    }
        
    return (<div style={{ width: '100%', height: '100%' }}>
                <ThemeProvider theme={defaultMaterialTheme}> 
                    <MaterialTable icons={tableIcons} title="Test Table" columns={columns} data={data} editable={{

                        isEditable: rowData => true,
                        //isEditHidden: rowData => rowData.name === 'x',
                        isDeletable: rowData => true,
                        //isDeleteHidden: rowData => rowData.name === 'y',
                        onBulkUpdate: changes =>
                                new Promise((resolve, reject) => {
                                setTimeout(() => { /*setData([...data,newData]);*/ //อันนี้ไม่ implement ก่อน 
                                    resolve();
                                   }, 1000); 
                                }),
                        onRowAddCancelled: rowData => console.log('Row adding cancelled'),
                        onRowUpdateCancelled: rowData => console.log('Row editing cancelled'), 
                        onRowAdd: newData => new Promise((resolve, reject) => { setTimeout(() => {
                                                    setData([...data,newData]);
                                                    //SET TABLE ใน DATABASE ด้วยค่า [...data,newData] ตรงนี้
                                                    // อันนี้เขียนฟังก์ชั่น rowUpdateHandler ไว้ให้ หรือจะคอล Axios ในนี้เลยก็ได้ คืออีกสองอันล่างมันคอลคล้าย ๆ กัน เลยรวบเป็นฟังก์ชั่นเดียว
                                                    rowUpdateHandler([...data,newData]);
                                                    // 
                                                    resolve();
                            }, 1000);
                        }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => { const dataUpdate=[...data]; //ก็อปปี้ขอ้มลูเดิม(data)มาเป็นอารเ์รยช์ดุใหม่ 
                                                    const index = oldData.tableData.id; 
                                                    dataUpdate[index] = newData; 
                                                    setData([...dataUpdate]);
                                                    //SET TABLE ใน DATABASE ด้วย [...dataUpdate]
                                                    // ก็เหมือนเดิม จะคอลในนี้หรือใช้ฟังก์ชั่น rowUpdateHandler ก็ได้
                                                    resolve(); 
                                }, 1000); }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => { const dataDelete=[...data]; //ก็อปปี้ขอ้มลูเดิม(data)มาเป็นอารเ์รยช์ดุใหม่ 
                                                    const index = oldData.tableData.id; 
                                                    dataDelete.splice(index, 1); 
                                                    setData([...dataDelete]);
                                                    //SET TABLE ใน DATABASE ด้วย [...dataDelete]
                                                    // ก็เหมือนเดิม จะคอลในนี้หรือใช้ฟังก์ชั่น rowUpdateHandler ก็ได้
                                                    resolve(); 
                                }, 1000); 
                            })
                            }}>
                    </MaterialTable>


                </ThemeProvider>
            </div>);








}

export default MaterialTableComponent;
