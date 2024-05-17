import { Component, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-competition-pdf',
  templateUrl: './competition-pdf.component.html',
  styleUrls: ['./competition-pdf.component.css']
})
export class CompetitionPDFComponent {
  @ViewChild('contentToConvert', { static: false }) contentToConvert!: ElementRef;

  downloadPDF() {
    const elementToPrint = this.contentToConvert.nativeElement;

    html2canvas(elementToPrint).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait, millimeters, A4 size
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 size width mm (210mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('myFile.pdf');
    });
  }
}
