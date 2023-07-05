<template>
    <div>
        <div class="container">
			<div class="handle-box">
				搜索知识库：<el-input v-model="query.title" placeholder="请输入博客标题" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="RefreshLeft" @click="handleResearch">重置</el-button>
				<el-button type="primary" :icon="Plus" @click="addVisible=true">新建知识库</el-button>
			</div>
            <div class="libraries">
                <div class="library" v-for="(item,index) of libraries">
                    <div class="library-flex">
                        <img class="library-cover" :src="String(libraryCovers[item.cover])" alt="" />
                        <div class="library-info">
                            <h2>{{ item.name }}</h2>
                            <p>{{ item.introduction }}</p>
                        </div>
                        <div class="library-right">
                            <p class="library-count">共 <strong>{{ item.count }}</strong> 篇文章</p>
                            <el-icon @click="item.showMore = !item.showMore" v-show="item.count">
                                <ArrowDown v-if="!item.showMore"/>
                                <ArrowUp v-if="item.showMore" />
                            </el-icon>
                            <div class="white-place" v-show="!item.count"></div>
                        </div>
                    </div>
                    <el-collapse-transition>
                        <div v-show="item.showMore" class="library-blogs">
                            <div class="library-blog" v-for="(article,index2) of item.articles" :key="article.articleId">
                                <span>{{ article.title }}</span>
                                <span>{{ format.formatDate2(article.updateTime) }}</span>
                            </div>
                        </div>
                    </el-collapse-transition>
                </div>
            </div>
            <div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
        </div>
        
		<!-- 新建知识库弹出框 -->
		<el-dialog title="新建知识库" v-model="addVisible" width="30%">
			<el-form label-width="100px">
				<el-form-item label="封面图片" class="choose-cover">
                    <el-icon @click="chooseLeft"><ArrowLeft /></el-icon>
					<img class="add-cover" :src="getAssetsFile" alt="" >
                    <el-icon @click="chooseRight"><ArrowRight /></el-icon>
				</el-form-item>
                <el-form-item label="知识库名称">
					<el-input v-model="form.name" placeholder="知识库名称"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input v-model="form.introduction" type="textarea" :rows="4" placeholder="知识库简介(选填)"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveAdd">确 定</el-button>
				</span>
			</template>
		</el-dialog>
    </div>
</template>
<script setup lang="ts" name="library">
import { ref, reactive, computed, inject } from 'vue' 
import { Delete, Edit, Search, Plus,RefreshLeft,ZoomIn } from '@element-plus/icons-vue';
import { getLibraryList,createLibrary } from '@/api/library'
import { ElMessage } from 'element-plus'
interface LibraryItem{
    id:number
    title: string;
	introduction: string;
    cover:number;
	count: number;
    showMore:boolean
    blogs: BlogItem[]
}
interface BlogItem{
    id:number
    title:string
    updateTime:string
}
const query = reactive({
	title: '',
	pageIndex: 1,
	pageSize: 5
});
const pageTotal = ref(0);
const format:any = inject("format") 
// 获取表格数据
const getData = () => {
    getLibraryList(query.title,query.pageIndex,query.pageSize)
        .then((res:any)=>{
            // console.log(res.data.data);
            while(libraries.length){
                libraries.pop()
            }
            Object.assign(libraries,res.data.data.list.items)
            pageTotal.value = res.data.data.total
        })
};
getData();
const libraries:Array<any> = reactive([])
const libraryCovers :Array<any> = [new URL('../assets/img/library1.jpg',import.meta.url).href,new URL('../assets/img/library2.jpg',import.meta.url).href,new URL('../assets/img/library3.jpg',import.meta.url).href,new URL('../assets/img/library4.jpg',import.meta.url).href,new URL('../assets/img/library5.jpg',import.meta.url).href,new URL('../assets/img/library6.jpg',import.meta.url).href,new URL('../assets/img/library7.jpg',import.meta.url).href,new URL('../assets/img/library8.jpg',import.meta.url).href,new URL('../assets/img/library9.jpg',import.meta.url).href,new URL('../assets/img/library10.jpg',import.meta.url).href,new URL('../assets/img/library11.jpg',import.meta.url).href,new URL('../assets/img/library12.jpg',import.meta.url).href]

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
const handleResearch = () => {
    query.title = "";
    query.pageIndex = 1;
    getData();
}
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

const addVisible = ref(false)
const form = reactive({
    cover:1,
    name:'',
    introduction:''
})
const getAssetsFile = computed(() => {
   return new URL(`../assets/img/library${form.cover}.jpg`, import.meta.url).href
})
const chooseLeft = () =>{
    if(form.cover==1){
        form.cover=12
    }else{
        form.cover--
    }
}
const chooseRight = () =>{
    if(form.cover==12){
        form.cover=1
    }else{
        form.cover++
    }
}
const saveAdd = () =>{
    createLibrary(form)
        .then((res:any) :any =>{
            if(res.data.code == 200){
                ElMessage({
                    // elmessage: error.elmessage,
                    message: '新建知识库成功!',
                    type: 'success',
                    duration: 3 * 1000
                })
            }else{
                ElMessage({
                    // elmessage: error.elmessage,
                    message: '新建失败',
                    type: 'error',
                    duration: 3 * 1000
                })
            }
            addVisible.value = false
            getData();
        })
        .catch((err:any)=>{
            ElMessage({
                // elmessage: error.elmessage,
                message: '新建失败',
                type: 'error',
                duration: 3 * 1000
            })
            addVisible.value = false
        })
}

</script>
<style lang="scss" scoped>

.handle-box{
    .handle-input {
	    width: 300px;
    }
    .mr10 {
        margin-right: 10px;
    }
}
.libraries{
    width: 100%;
    margin-top: 20px;
    .library{
        width: 100%;
        margin-bottom: 20px;
        .library-flex{
            width: 100%;
            height: 100px;
            padding: 10px;
            display: flex;
            flex-direction: row;
            align-items:center ;
            position: relative;
            
            .library-info{
                h2{
                    margin-bottom: 10px;
                }
                p{
                    width: 400px;
                    color: #8590a6;
                }
            }
            .library-cover{
                width: 100px;
                height: 100px;
                margin-right: 50px;
            }
            .library-right{
                position: absolute;
                right: 100px;
                display: flex;
                align-items: center;
                p{
                    width: 150px;
                    margin-right:50px;
                    strong{
                        font-size: 24px;
                        font-weight: 700;
                        display: inline-block;
                        position: relative;
                        top: 2px;
                    }
                }
                .el-icon{
                    font-size:30px;
                    cursor: pointer;
                }
                .white-place{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .library-blogs{
            padding: 10px;
            .library-blog{
                margin: 5px 35px 5px 5px;
                padding: 5px;
                border-bottom: 1px solid rgba($color: #8590a6, $alpha: 0.2);
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                &:hover{
                    background-color: rgb(250,250,250);
                }
            }
        }
    }
}
.choose-cover{
    .el-icon{
        font-size: 20px;
        cursor: pointer;
    }
    .add-cover{
        width: 80px;
        height: 80px;
        object-fit: cover;
        padding: 2px;
        border: 1px solid #8590a6;
        border-radius: 5px;
    }
}

</style>