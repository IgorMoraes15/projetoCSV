import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router }                       from "@angular/router";
import { FileUtil }                     from './file.util';
import { Constants }                    from './test.constants';
import { exists } from "fs";

 
@Component({
  template: require('./test.component.html')
})

export class TestComponent implements OnInit {

  [x: string]: any;
  @ViewChild('fileImportInput')
  fileImportInput: any;
  delimit: any;

  csvRecords = [];

  constructor(private _router: Router,
              private _fileUtil: FileUtil,
              private el:ElementRef
  ) { }

  ngOnInit() { }

  // METHOD CALLED WHEN CSV FILE IS IMPORTED



  showAllData(): void{ //essa funçao puxa todos os dados do arquivo.
    var text = [];
    var target = this.fileImportInput.nativeElement; // Input File com arquivo!
    var files = this.fileImportInput.nativeElement.files; // Pegando os dados do Input File! 
    if(Constants.validateHeaderAndRecordLengthFlag){ // Verificação para saber se é um arquivo .csv
      if(!this._fileUtil.isCSVFile(files[0])){
        alert("Please import valid .csv file.");
        this.fileReset();
      }
    }
    var input =  this.fileImportInput.nativeElement;
    var reader = new FileReader(); // leitor dos arquivos
    reader.readAsText(input.files[0]); // lendo arquivo que foi colocado no input file
    reader.onload = (data) => {
      let csvData = reader.result;
      let csvRecordsArray = csvData.split(/\r\n|\n/);
      var headerLength = -1;
      if(Constants.isHeaderPresentFlag){
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length; 
      }
      this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray, 
          headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);
      if(this.csvRecords == null){
        alert('Não existe nenhum conteudo no arquivo CSV! Tente outro arquivo! ')
        this.fileReset();
      }    
    }
    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  };


  showHeader(){ // essa puxa somente o header(cabeçalho) do arquivo // de-para
    
    var text = [];
    var target = this.fileImportInput.nativeElement; // Input File com arquivo!
    var files = this.fileImportInput.nativeElement.files; // Pegando os dados do Input File! 
    if(Constants.validateHeaderAndRecordLengthFlag){ // Verificação para saber se é um arquivo .csv
      if(!this._fileUtil.isCSVFile(files[0])){
        alert("Please import valid .csv file.");
        this.fileReset();
      }
    }
    var input =  this.fileImportInput.nativeElement;
    var reader = new FileReader(); // leitor dos arquivos
    reader.readAsText(input.files[0]); // lendo arquivo que foi colocado no input file
    reader.onload = (data) => {
      let csvData = reader.result;
      let csvRecordsArray = csvData.split(/\r\n|\n/);
      var headerLength = -1;
      if(Constants.isHeaderPresentFlag){
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length; 
      }
      this.csvRecords = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
      
      if(this.csvRecords == null){
        //If control reached here it means csv file contains error, reset file.
        this.fileReset();
      }    
    }
  }; 
  
  fileReset(){
    this.fileImportInput.nativeElement.value = "";
    //this.delimit.nativeElement.value = "";
    this.csvRecords = [];
  }
  
  delimitador : string;
  switchDelimiter(){
    Constants.tokenDelimeter = this.delimitador;
    if(this.fileImportInput.nativeElement.value == ""){
      alert("Nenhum Arquivo Selecionado. Por Favor, coloque o Arquivo CSV");
      window.location.reload();
    }else{
      this.showHeader();
    }
  }

  public options = [
    { name: "Selecione",    value: 0 },
    { name: "name",         value: 1 },
    { name: "email",        value: 2 },
    { name: "phone",        value: 3 },
    { name: "zipCode",      value: 4 },
    { name: "street",       value: 5 },
    { name: "number",       value: 6 },
    { name: "city",         value: 7 },
    { name: "state",        value: 8 },
    { name: "notes",        value: 9 },
    { name: "latitude",     value: 10 },
    { name: "longitude",    value: 11 },
    { name: "complement",   value: 12 },
    { name: "archived",     value: 13 },
    { name: "neighborhood", value: 14 }
  ]

  


   
  csvRec: string;

  onChange(event){
    // var opt = this.csvRec;
    console.log(this.csvRec);
  }

}