let sheet;

var options = {
  data: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  minDimensions: [3, 3]
}

new Vue({
  el: "#spreadsheet",
  mounted: function(){
    sheet = jspreadsheet(this.$el, options);
    Object.assign(this, sheet);
  }
})

new Vue({
  el: "#converter",
  data:{
    table: "Sample",
    sql: "",
  },
  methods: {
    reset: function(){
      sheet.setData([[]]);
      this.sql = "";
    },
    clip: function(){
      navigator.clipboard.writeText(this.sql);
    },
    convert: function(){
      
      let data = sheet.getData();
      let width = data.length;
      
      if(width > 0){
        let height = data[0].length;
      
        this.sql = ""
        
        // CREATE文の生成
        let create_sql = `CREATE TABLE ${this.table}(\n`;
        for(let j=0; j<width; j++){
          
          let type;
          let value = data[0][j];
          
          if(/\d\d\d\d-\d\d-\d\d/.test(value)){
             type="DATE";
          }
          else if(isNaN(value)){
            type = "VARCHAR";
          }
          else{
            type = "INTEGER";
          }
          
          if(j != width - 1){
            create_sql += sheet.getHeader(j) + ` ${type},\n`
          }
          else{
            create_sql += sheet.getHeader(j) + ` ${type}\n`
          }
        }
        create_sql += `);\n`
        
        this.sql += create_sql + "\n"
        
        // INSERT文の生成
        for(let i=0; i<height; i++){
         
          let insert_sql = `INSERT INTO ${this.table} VALUES(`;
          for(let j=0; j<width; j++){
            value = data[i][j];
            
            if(isNaN(value)){
              value = "'" + value + "'"
            }
            
            if(j != width - 1){
              insert_sql += value + ","
            }
            else{
              insert_sql += value
            }
          }
          insert_sql += `);\n`
          this.sql += insert_sql;
        }
        
      }
      else{
        alert("No Data");  
      }
     
    }
  }
})