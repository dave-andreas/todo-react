import React, { Component } from 'react';
import {Table,Button} from 'reactstrap'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal=withReactContent(Swal)

class Homepage extends Component {
    state = {
        data:[],
        isopen:false,
        modaledit:false,
        indexedit:-1
    }
    onAddDataClik=()=>{
        var kegiatan=this.refs.kegiatan.value
        var tanggal=this.refs.tanggal.value
        var obj={
            kegiatan,
            status:false,
            tanggal
        }
        if(kegiatan===''||tanggal===''){
            MySwal.fire(
                'cancel nih',
                'tolong diisi lah',
                'error'
            )
        }else{
            MySwal.fire(
                'Berhasil',
                'cok dicek',
                'success'
            )
            var newdata=[...this.state.data,obj]
            this.setState({data:newdata,isopen: false})
        }
    }
    // const [modal,setModal]=useState(false)
    // tambah=()=>{
    //     setModal(!modal)
    // }
    onDeleteDataClick=(index)=>{
        MySwal.fire({
            title: 'Apa kamu yakin mau hapus '+this.state.data[index].kegiatan+'?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, apus aja ribet amat lu',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result)=>{
            if(result.value){
                var data=this.state.data
                data.splice(index,1)
                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                this.setState({data:data})
            }else if(result.dismiss===Swal.DismissReason.cancel) {
              MySwal.fire(
                'Cancelled',
                'ngabisin waktu aja luu klik klik',
                'error'
              )
            }
        })
    }
    onEditClick=(index)=>{
        this.setState({modaledit:true,indexedit:index})
    }
    onEditDataClick=()=>{
        // var indexedit=index
        var kegiatan=this.refs.kegiatan.value
        var tanggal=this.refs.tanggal.value
        var status=0
        if(this.refs.status.value==='true'){
            status=true
        }else{
            status=false
        }
        var obj={
            kegiatan,
            status,
            tanggal
        }
        if(kegiatan===''||tanggal===''){
            MySwal.fire(
                'cancel nih',
                'tolong diisi lah',
                'error'
            )
        }else{
            MySwal.fire(
                'Berhasil',
                'cok dicek',
                'success'
            )
            this.state.data[index].kegiatan=kegiatan
            this.state.data.splice(this.state.indexedit,1,obj)
            this.setState({modaledit: false})
        }
    }
    componentDidMount(){
        this.setState({
            data:[
                {kegiatan: 'Bobo',status: true, tanggal:'2019-12-13'},
                {kegiatan: 'Mamam',status: false, tanggal:'2019-12-25'},
            ]
        })
    }
    renderTodo=()=>{
        return this.state.data.map((val,index)=>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{val.kegiatan}</td>
                    <td>{val.status?'Sudah':'Belum'}</td>
                    <td>{val.tanggal}</td>
                    <td>
                        <Button onClick={()=>this.onEditClick(index)} color="secondary" className='mr-2'>edit</Button>
                        <Button onClick={()=>this.onDeleteDataClick(index)} color="warning">delete</Button>
                    </td>
                </tr>
            )
        })
    }
    render() { 
        return (
            <div>
                <Modal isOpen={this.state.isopen} toggle={()=>this.setState({isopen:false})}>
                    <ModalHeader>Tambah-tambah</ModalHeader>
                    <ModalBody>
                        <input className='form-control' placeholder='kegiatan' type="text" ref='kegiatan'/>
                        <input className='form-control' placeholder='tanggal' type="date" ref='tanggal'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.onAddDataClik} color="primary">Add</Button>
                        <Button onClick={()=>this.setState({isopen:false})} color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modaledit} toggle={()=>this.setState({modaledit:false})}>
                    <ModalHeader>Ubah-merubah</ModalHeader>
                    <ModalBody>
                        <input className='form-control' placeholder='kegiatan' type="text" ref='kegiatan'/>
                        <select className='form-control' ref='status'>
                            <option value="true">Sudah</option>
                            <option value="false">Belum</option>
                        </select>
                        <input className='form-control' placeholder='tanggal' type="date" ref='tanggal'/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.onEditDataClick} color="primary">Edit</Button>
                        <Button onClick={()=>this.setState({modaledit:false})} color="secondary">Cancel</Button>
                    </ModalFooter>
                </Modal>
                <div className="px-5">
                    <Table hover>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Kegiatan</th>
                                <th>Status</th>
                                <th>Tanggal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTodo()}
                        </tbody>
                    </Table>
                    <Button color='primary' onClick={()=>this.setState({isopen: true})}>Add</Button>
                </div>
            </div>
        );
    }
}
 
export default Homepage;