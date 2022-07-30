export default{
    state:{
        formName:'admin',
        formAddress:'ningbbn@163.com'
    },
    mutations:{
    changeTime(state,val){
        state.formName = val
        console.log(state.formName);
    },
    changeAddress(state,val){
        state.formAddress = val
    }
}}  