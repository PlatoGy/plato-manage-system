<template>
    <div>
        <div class="container">
            <input class="topic" type="text" placeholder="请输入文章标题"  v-model="form.title">
            <!-- <div class="plugins-tips">
                md-editor-v3：vue3版本的 markdown 编辑器，配置丰富，请详看文档。 访问地址：
                <a href="https://imzbf.github.io/md-editor-v3/index" target="_blank">md-editor-v3</a>
            </div> -->
            <div class="choose-tags">
                <el-button type="info" :icon="Plus" round @click="handleChooseLabel">选择标签</el-button>
                <el-button type="info"  round plain v-for="(item,index) of form.labelId">
                    {{item.name}}&nbsp;
                    <el-icon @click="removeTag(item.id)"><Close /></el-icon>
                </el-button>
            </div>
            <md-editor class="editor" v-model="form.content" @on-upload-img="onUploadImg"  />
            <el-button class="submit-btn" type="primary" @click="handlechooseLibrary">提交</el-button>
        </div>
        <!-- 新增弹出框 -->
        <el-dialog  title="选择知识库" v-model="libraryVisible" width="23%">
            <div class="import-dialog">
                <span>请选择知识库</span>
                <el-input class="import-search" v-model="search" placeholder="请输入知识库名进行搜索"  :prefix-icon="Search" @input="handleSearch"></el-input>
                <div class="import-libraries">
                    <div :class="item.id == choosingLibrary ? 'library-item chosen-library' : 'library-item' " v-for="(item,index) in libraries" @click="chooseLibrary(item.id)"> 
                        <el-icon><Management /></el-icon>
                        <span>{{item.name}}</span> 
                    </div>
                </div>
            </div>
            <template #footer>
				<span class="dialog-footer">
					<el-button @click="cancelChooseLibrary">取 消</el-button>
					<el-button type="primary" @click="confirmChooseLibrary">确 定</el-button>
				</span>
			</template>
		</el-dialog>
            <!-- 新增弹出框 -->
        <el-dialog  title="选择标签" v-model="labelVisible" width="23%">
            <div class="import-dialog">
                <span>选择标签</span>
                <el-input class="import-search" v-model="search2" placeholder="请输入标签名搜索"  :prefix-icon="Search" @input="handleSearch2"></el-input>
                <div class="chosen-labels">
                    <el-button type="info" size="small" round v-for="(item,index) in checkedlabels">
                        {{ item.name }}
                        <el-icon class="el-icon--right" @click="deleteChoose(item.id)"><Close /></el-icon>
                    </el-button>
                </div>
                <div class="choosing-labels">
                    <el-button type="info" size="small" round plain v-for="(label,index) in labels" @click="addChoose(label)">
                        {{ label.name }}
                    </el-button>
                </div>

            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelChooseLabel">取 消</el-button>
                    <el-button type="primary" @click="confirmChooseLabel">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts" name="editOnline">
import { reactive, ref, inject} from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ElMessage, ElMessageBox } from 'element-plus'
import { getLibraryList,getLabelList,createArticle, getPic } from '@/api/creatBlog/index'
import { Search,Plus } from '@element-plus/icons-vue';
//提交表单
let form:any = reactive({
    title:'',
    content:'',
    labelId:[],
    libraryId:-1,
    cover:''
})
const removeTag = (id:number)=>{
    for(let i=0;i<form.labelId.length;i++){
        if(id==form.labelId[i].id){
            form.labelId.splice(i,1)
        }
    }
}
const onUploadImg = (files: any) => {
	console.log(files);
};


//选择标签弹窗
let labelVisible:any = ref(false)
const labels:any = reactive([])
const checkedlabels:any = reactive([])
const handleChooseLabel = () => {
    labelVisible.value = true
    getLabelList(search.value)
        .then((res:any)=>{
            if(res.data.code == 200){
                while(labels.length){
                    labels.pop()
                }
                labels.push(...res.data.data)
            }
        })
        .catch((err:any)=>{
        })
}
const addChoose = (label:any) => {
    let i = 0
    let flag = false
    while(i<checkedlabels.length){
        if(checkedlabels[i].id == label.id){
            flag = true
            break
        }
        i++
    }
    if(!flag){
        checkedlabels.push(label)
    }
}
const deleteChoose = (id:number) => {
    let i = 0
    while(i<checkedlabels.length){
        if(checkedlabels[i].id == id){
            checkedlabels.splice(i,1)
            break
        }
        i++
    }
}
const cancelChooseLabel = () => {
    while(checkedlabels.length){
        checkedlabels.pop()
    }
    labelVisible.value = false
}
const confirmChooseLabel = () => {
    Object.assign(form.labelId,checkedlabels)
    labelVisible.value = false
}


//选择知识库弹窗
let libraryVisible:any = ref(false)
const handlechooseLibrary = () => {
    getLibraryList(search.value)
        .then((res:any)=>{
            if(res.data.code == 200){
                while(libraries.length){
                    libraries.pop()
                }
                libraries.push(...res.data.data)
                libraryVisible.value = true
            }
        })
        .catch((err:any)=>{
        })
}

const libraries:Array<any> = reactive([])
const chooseLibrary = (id:number) => {
    choosingLibrary.value = id
}
let choosingLibrary = ref(-1)
const cancelChooseLibrary = () => {
    choosingLibrary.value = -1
}  
const confirmChooseLibrary = () => {
    form.libraryId = choosingLibrary.value
    let submitForm = Object.assign({},form)
    let labelId:any = []
    submitForm.labelId.forEach((e:any)=>{
        labelId.push(e.id)
    })
    submitForm.labelId = labelId
    getPic()
        .then((res:any)=>{
            if(res.data.code==200){
                submitForm.cover = res.data.imgurl
                createArticle(submitForm)
                .then((res:any)=>{
                    if(res.data.code==200){
                        ElMessage({
                            // elmessage: error.elmessage,
                            message: '导入成功',
                            type: 'success',
                            duration: 3 * 1000
                        })
                        while(checkedlabels.length){
                            checkedlabels.pop()
                        }
                        choosingLibrary.value = -1
                        libraryVisible.value = false

                    }else{
                        ElMessage({
                            // elmessage: error.elmessage,
                            message: '导入失败',
                            type: 'error',
                            duration: 3 * 1000
                        })
                    }
                    
                })
                .catch(err=>{
                    ElMessage({
                            // elmessage: error.elmessage,
                            message: '导入失败',
                            type: 'error',
                            duration: 3 * 1000
                        })
                    console.log(err);
                })
            }
        })
        .catch((err:any)=>{
            console.log(err);
            
        })

}



//输入后搜索：采用防抖策略
const debounce:any = inject('debounce')
const search = ref('')
const handleSearch = debounce(()=>{
    getLibraryList(search.value)
        .then((res:any)=>{
            if(res.data.code == 200){
                while(libraries.length){
                    libraries.pop()
                }
                libraries.push(...res.data.data)
            }
        })
        .catch((err:any)=>{
        })
},1000)
const search2 = ref('')
const handleSearch2 = debounce(()=>{
    getLabelList(search2.value)
        .then((res:any)=>{
            if(res.data.code == 200){
                while(labels.length){
                    labels.pop()
                }
                labels.push(...res.data.data)
            }
        })
        .catch((err:any)=>{
        })
},1000)

</script>
<style lang="scss" scoped>
.submit-btn{
    margin-top: 10px;
}
.topic{
    width: 100%;
    display: block;
    background:none;    
    outline:none;   
    border:none;
    font-size: 30px;
    margin: 20px 10px;
}
.choose-tags{
    margin-left:10px;
    margin-bottom:15px;
}
.editor{
    height: 800px;
}
.import-dialog{
    display: flex;
    flex-direction: column;
    span{
        color: #8590A6;
    }
    .import-search{
        margin: 10px 0;
    }
    .import-libraries{
        height: 260px;
        overflow-y: auto;
        
        
        :deep(.el-upload--text){
            width:100%;
        }

        .library-item{
            width: 100%;
            display: flex;
            align-items: center;
            height: 50px;
            font-size: 24px;
            color: rgb(46, 189, 106);
            cursor: pointer;
            span{
                    margin-left: 15px;
                    font-size: 14px;
                    color: rgb(143, 148, 146);
                }


            border-bottom: 1px solid rgba(143, 148, 146,0.2);
            &:last-child{
                border-bottom: 0;
            }
            &:hover{
                background: rgba(246, 248, 250);
            }
        }
        .chosen-library{
            background: rgba(246, 248, 250);
        }
    }
    .chosen-labels{
        .el-button{
            margin: 5px;
        }
    }
    .choosing-labels{
        margin-top: 10px;
        border-top: 1px solid #8590A6;
        padding: 10px;
        .el-button{
            margin: 5px;
        }
    }

}
</style>