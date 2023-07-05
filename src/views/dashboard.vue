<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="16">
				<el-card shadow="hover" class="mgb20 line-card" style="height: 403px">
					<template #header>
						<div class="clearfix">
							<span>访问量曲线</span>
						</div>
					</template>
					<Line class="line-chart" :lineData="hotLine"></Line>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" class="pie-card" style="height: 403px">
					<template #header>
						<div class="clearfix">
							<span>分布情况</span>
						</div>
					</template>
					<Pie class="pie-chart" :distribution="distribution"></Pie>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :gutter="10" :span="24">
				<el-card shadow="hover" class="mgb20" style="height: 383px">
					<template #header>
						<div class="clearfix">
							<span>知识库</span>
						</div>
					</template>
					<div class="libraries">
						<div class="library" v-for="(library,index) in libraries">
							<img :src="String(libraryCovers[library.cover])" alt="">
							<div class="library-bottom">
								<h3>{{library.name}}</h3>
								<p>{{library.count}}篇文章 9次阅读</p>
							</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="24">
				<el-card shadow="hover" class="mgb20 last-blog-card" style="height: 403px">
					<template #header>
						<div class="clearfix">
							<span>最近博客</span>
						</div>
					</template>
					<div class="last-blogs">
						<el-timeline v-for="(blog,index) in latestBlogs">
							<el-timeline-item :timestamp="format.formatDate2(blog.updateTime)" placement="top">
								<el-card>
									<h4>{{blog.title}}</h4>
									<p>Plato committed {{format.formatDate2(blog.updateTime)}}</p>
								</el-card>
							</el-timeline-item>
							<!-- <el-timeline-item timestamp="2018/4/3" placement="top">
							<el-card>
								<h4>Update Github template</h4>
								<p>Tom committed 2018/4/3 20:46</p>
							</el-card>
							</el-timeline-item>
							<el-timeline-item timestamp="2018/4/2" placement="top">
							<el-card>
								<h4>Update Github template</h4>
								<p>Tom committed 2018/4/2 20:46</p>
							</el-card>
							</el-timeline-item>
							<el-timeline-item timestamp="2018/4/2" placement="top">
							<el-card>
								<h4>Update Github template</h4>
								<p>Tom committed 2018/4/2 20:46</p>
							</el-card>
							</el-timeline-item> -->
						</el-timeline>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import { inject, reactive } from 'vue';
import imgurl from '../assets/img/img.jpg';
import Line from '@/components/echarts/line.vue'
import Pie from '@/components/echarts/pie.vue'
import { getHotLine, getDistribution, getLibrary, getLatest } from '@/api/dashboard/index'
//热度曲线
const hotLine:any = reactive([])
const getHotLineData = () => {
	getHotLine()
		.then((res:any)=> {
			if(res.data.code==200){
				while(hotLine.length){
					hotLine.pop()
				}
                Object.assign(hotLine,res.data.data)
			}else{
				
			}
			
		})
		.catch(err=>{
			console.log(err);
		})

}
getHotLineData()
//分布饼图
const distribution:any = reactive([])
const getDistributionData = () => {
	getDistribution()
		.then((res:any)=> {
			if(res.data.code==200){
				while(distribution.length){
					distribution.pop()
				}
                Object.assign(distribution,res.data.data)
			}else{
				
			}
			
		})
		.catch(err=>{
			console.log(err);
		})

}
getDistributionData()


//知识库
const libraries:any = reactive([])
const libraryCovers :Array<any> = [new URL('../assets/img/library1.jpg',import.meta.url).href,new URL('../assets/img/library2.jpg',import.meta.url).href,new URL('../assets/img/library3.jpg',import.meta.url).href,new URL('../assets/img/library4.jpg',import.meta.url).href,new URL('../assets/img/library5.jpg',import.meta.url).href,new URL('../assets/img/library6.jpg',import.meta.url).href,new URL('../assets/img/library7.jpg',import.meta.url).href,new URL('../assets/img/library8.jpg',import.meta.url).href,new URL('../assets/img/library9.jpg',import.meta.url).href,new URL('../assets/img/library10.jpg',import.meta.url).href,new URL('../assets/img/library11.jpg',import.meta.url).href,new URL('../assets/img/library12.jpg',import.meta.url).href]
const getLibraries = () => {
	getLibrary()
		.then((res:any)=> {
			if(res.data.code==200){
				while(libraries.length){
					libraries.pop()
				}
                Object.assign(libraries,res.data.data)
			}else{
				
			}
			
		})
		.catch(err=>{
			console.log(err);
		})

}
getLibraries()
//最近博客
const latestBlogs:any = reactive([])
const format:any = inject("format")
const getLatestBlogs= () => {
	getLatest()
		.then((res:any)=> {
			if(res.data.code==200){
				while(latestBlogs.length){
					latestBlogs.pop()
				}
                Object.assign(latestBlogs,res.data.data)
			}else{
				
			}
			
		})
		.catch(err=>{
			console.log(err);
		})

}
getLatestBlogs()

</script>

<style lang="scss" scoped>
.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.mgb20 {
	margin-bottom: 20px;
}
.line-card{
	:deep(.el-card__body){
		height: 80%;
	}
	.line-chart{
		height: 100%;
	}
}
.pie-card{
	:deep(.el-card__body){
		height: 80%;
	}
	.pie-chart{
		height: 100%;
	}
}


.libraries{
	display: flex;
	.library{
		flex:1;
		border: 1px solid rgb(245, 245, 245);
		box-shadow:6px 6px 8px rgb(58 61 74 / 2%);
		margin: 10px;
		img{
			width: 100%;
			height: 120px;
			object-fit: cover;
			object-position:top;
		}
		.library-bottom{
			height: 100px;
			padding: 20px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
}
.last-blog-card{
	padding-bottom:20px;
	.last-blogs{
		padding-right: 20px;
		height: 343px;
		overflow-y: auto;
	}
}

</style>
