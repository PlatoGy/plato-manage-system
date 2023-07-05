<template>
    <div>
        <div class="container">
            <div>导入</div>
            <div class="import-options">
                <div class="import-item" @click="handleChoose">
                    <img src="@/assets/img/md.png" alt="">
                    <h4>Markdown</h4>
                    <span>.md .markdown .mark .txt</span>
                </div>
            </div>
        </div>
        
        <el-dialog  title="选择知识库" v-model="chooseVisible" width="23%">
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
		<el-dialog  title="选择标签" v-model="importVisible" width="23%">
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
                <!-- <el-checkbox-group v-model="checkedlabels" >
                    <el-checkbox v-for="label in labels" :key="label" :label="label">{{
                    label.name
                    }}</el-checkbox>
                </el-checkbox-group> -->

            </div>
            <template #footer>
				<span class="dialog-footer">
					<el-button @click="cancelImport">取 消</el-button>
                    <el-upload
                        ref="uploadRef"
                        class="dialog-upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-success="handleUpload"
                        :file-list="fileList"
                        :show-file-list="false"
                        accept=".md"
                    >
					    <el-button type="primary" @click="confirmImport">确 定</el-button>
                    </el-upload>
				</span>
			</template>
		</el-dialog>
    </div>
</template>
<script setup lang="ts" name="importBlog">
import { ref, reactive,inject } from 'vue' 
import { Search } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import { getLibraryList,getLabelList,createArticle,getPic } from '@/api/creatBlog/index'
//1.选择知识库
let chooseVisible:any = ref(false)
const libraries:Array<any> = reactive([])
//TODO:加载组件
const handleChoose = () => {
    getLibraryList(search.value)
        .then((res:any)=>{
            if(res.data.code == 200){
                while(libraries.length){
                    libraries.pop()
                }
                libraries.push(...res.data.data)
                chooseVisible.value = true
            }
        })
        .catch((err:any)=>{
        })
}
const chooseLibrary = (id:number) => {
    choosingLibrary.value = id
}
let choosingLibrary = ref(-1)
let chosenLibrary = ref(-1)
const cancelChooseLibrary = () => {
    choosingLibrary.value = -1
}
const confirmChooseLibrary = () => {
    chosenLibrary.value = choosingLibrary.value
    getLabelList(search.value)
        .then((res:any)=>{
            if(res.data.code == 200){
                while(labels.length){
                    labels.pop()
                }
                labels.push(...res.data.data)
                chooseVisible.value = false
                importVisible.value = true
            }
        })
        .catch((err:any)=>{
        })

}
//2.选择标签
let importVisible:any = ref(false)
const labels:any = reactive([])
const checkedlabels:any = reactive([])
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
const cancelImport = () => {
    while(checkedlabels.length){
        checkedlabels.pop()
    }
    choosingLibrary.value = -1
    importVisible.value = false
}
const uploadRef = ref<UploadInstance>()
const confirmImport = () => {
    uploadRef.value!.submit()
}


//弹窗打开后，输入后搜索：采用防抖策略
const debounce:any = inject('debounce')
//知识库弹窗-搜索
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
//标签弹窗-搜索
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

//3.上传文件
const fileList:any = reactive([]) 
let article_title = ""
const handleUpload = (response:any,file:any,fileList:any)=>{ 
    article_title = file.name.split('.md')[0]
    let reader = new FileReader()
    reader.readAsText(file.raw,'UTF-8')
    reader.onload = (e:any) => {
        let val = e.target.result
        let labelId:any = []
        checkedlabels.forEach((e:any)=>{
            labelId.push(e.id)
        })
        let importForm = {
            title:article_title,
            content:val,
            libraryId:chosenLibrary.value,
            labelId:labelId,
            cover:''
        }
        getPic()
        .then((res:any)=>{
            console.log(res);
            
            if(res.data.code==200){
                importForm.cover = res.data.imgurl
                console.log(importForm);
                
                createArticle(importForm)
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
                        importVisible.value = false

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
} 

</script>
<style lang="scss" scoped>
.import-options{
    width: 100%;
    margin-top: 40px;
    padding: 0 30px;
    display: flex;
    
    .import-item{
        display: flex;
        margin-right: 30px;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .img{
            width: 70px;
            height: 70px;
        }
        h4{
            font-size: 20px;
            margin: 10px 0;
        }
        span{
            color: #8590A6;
        }
    }
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
.dialog-footer{
    .dialog-upload{
        display: inline-block;
        margin-left: 10px;
    }
}
</style>