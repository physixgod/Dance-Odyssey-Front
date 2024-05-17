import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-showfeedback',
  templateUrl: './showfeedback.component.html',
  styleUrls: ['./showfeedback.component.css']
})
export class ShowfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  filteredFeedbacksPage: Feedback[] = []; // New property for the current page
  selectedMessageFilter: string = 'all';
  searchQuery: string = '';
  currentPage: number = 1; // Current page number
  pageSize: number = 5; // Number of feedbacks per page
  totalPages: number = 0;
  stars: number[] = [1, 2, 3, 4, 5]; 

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    console.log('Initializing component...');
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    console.log('Fetching feedbacks...');
    this.feedbackService.Showfeedback().subscribe(
      (feedbacks: Feedback[]) => {
        console.log('Received feedbacks:', feedbacks);
        this.feedbacks = feedbacks;
        this.applyFilter(); // Apply filter initially
      },
      (error) => {
        console.log('Error fetching feedbacks:', error);
      }
    );
  }

  applyFilter() {
    console.log('Applying filter...');
    if (this.selectedMessageFilter === 'all' && !this.searchQuery) {
      // Display all feedbacks without filtering
      this.filteredFeedbacks = this.feedbacks;
    } else {
      // Apply filter based on selectedMessageFilter and searchQuery
      this.filteredFeedbacks = this.feedbacks.filter(feedback =>
        (!feedback.feedbackMessage || feedback.feedbackMessage.toLowerCase().includes(this.selectedMessageFilter.toLowerCase())) &&
        (!this.searchQuery || feedback.feedbackMessage.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  
    console.log('Filtered feedbacks:', this.filteredFeedbacks);
    this.totalPages = Math.ceil(this.filteredFeedbacks.length / this.pageSize);
    this.goToPage(1); // Reset to first page after filtering
  }
  paginateFeedbacks() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredFeedbacks.length);
    this.filteredFeedbacksPage = this.filteredFeedbacks.slice(startIndex, endIndex);
  }
  updateResolved(feedback: Feedback): void {
    // Update the feedback
    this.feedbackService.updateFeedback(feedback).subscribe(updatedFeedback => {
      // Optionally, you can update the feedbacks list to reflect the changes
      console.log('Resolved status updated successfully:', updatedFeedback);
    });
  }

  onMessageFilterChange() {
    console.log('Message filter changed:', this.selectedMessageFilter);
    this.currentPage = 1; // Reset to the first page when filter changes
    this.applyFilter(); // Trigger filtering when message filter changes
  }

  calculateAverageRating(): number {
    if (this.filteredFeedbacks.length === 0) {
      return 0;
    }
  
    const totalRating = this.filteredFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const average = totalRating / this.filteredFeedbacks.length;
    return parseFloat(average.toFixed(1)); // Round to one decimal place
  }

  generateStarRating(): string {
    const averageRating = this.calculateAverageRating();
    const stars = '⭐️'.repeat(averageRating); // Repeat the star character based on the average rating
    return stars;
  }

  goToPage(pageNumber: number) {
    console.log('Navigating to page:', pageNumber);
    if (pageNumber < 1 || pageNumber > this.totalPages) {
      return; // Do nothing if the page number is out of bounds
    }
    this.currentPage = pageNumber;
    this.paginateFeedbacks();
  }

  goToPreviousPage() {
    console.log('Going to previous page...');
    if (this.currentPage > 1) {
      this.currentPage -= 1; 
      this.paginateFeedbacks();
    }
  }

  goToNextPage() {
    console.log('Going to next page...');
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.paginateFeedbacks(); 
    }
  }
}
