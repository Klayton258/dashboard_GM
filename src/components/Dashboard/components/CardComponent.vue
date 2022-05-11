<template>

    <div class="card mb-3" style="max-width: 500px;">
        <div class="row g-0">
          <div class="col-md-4 icon-box">
             <i :class="['fa icon', iconBind]"></i>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{title}}</h5>
              <p class="card-text">{{description}}  <span>{{qtd}}<i class="fa fa-arrow-up icon"></i></span></p>
               <p class="card-text card-ltu"><small class="text-muted">Last updated {{lastupdate}}</small></p>
            </div>
           </div>
        </div>
    </div>

</template>


<script>
    name: 'CardComponent'

export default {
    props:{
        title: String,
        iconBind: String,
        description: String,
        qtd: String,
        lastupdate: String
    }
}
</script>

<style lang="scss" scoped>
    .card{
        margin: 2px;
        padding: 0px;
        background-color: rgb(0, 161, 161);
        .icon-box{
            display: flex;
            align-items: center;
            justify-content: center;
            .icon{
                font-size: 80px;
                color: white;
            }
        }
        .card-title{
            color: white;

            }
        .card-text{
            color: white;

            span{
                color: rgb(60, 255, 0);
                font-size: 20px;
                .icon{
                    font-size: 15px;
                    margin-bottom: 4px;
                }
            }
        }
        .card-ltu{
            color: aliceblue;
        }
    }
</style>