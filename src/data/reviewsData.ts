export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  avatar?: string;
  text: string;
  badge?: string;
  ownerResponse?: string;
}

export const googleReviewsConfig = {
  overallRating: 5.0,
  totalReviews: 54,
  placeName: "Dr. Bhoomi Raval - Psychiatrist (Gold Medalist) | MANAM Mental Health Initiative",
  clinicLocation: "Kotak Hospital, Moti Tanki Chowk, Sadar Bazar, Rajkot, Gujarat",
  googleMapsUrl:
    "https://maps.app.goo.gl/utqdb22oA8VKZwqa6?g_st=ac",
};

export const reviewsData: GoogleReview[] = [
  {
    id: "review-1",
    author: "Bhasha Dave",
    rating: 5,
    date: "4 months ago",
    badge: "Verified Patient",
    text: "The best Psychiatrist anybody can ask for! She is a calm presence in chaos! Her gentle way of listening makes patients feel safe, understood and less alone. Her approach brings clarity, comfort and confidence. Her reassurance feels like healing. Truly recommend for anyone seeking genuine mental health care.",
  },
  {
    id: "review-2",
    author: "Dr. Hetvi Parghi",
    rating: 5,
    date: "4 months ago",
    badge: "Medical Doctor • Verified Patient",
    text: "So me being a doctor is going through very difficult time of my life and I’ve been diagnosed with depression, so I decided to take professional help from MANAM, Dr. Bhoomi. She has been such a great support and motivator. She has seen all my struggles and helped me regain clarity and strength.",
  },
  {
    id: "review-3",
    author: "Anshuman Singh Chouhan",
    rating: 5,
    date: "2 months ago",
    badge: "Local Guide • 7 Reviews",
    text: "Dr. Bhoomi and I connected recently, and I am truly grateful that we did and that she took on my case. Apart from being highly professional and providing the right guidance, Dr. Bhoomi made sure that I received the help I needed. One of the best psychiatrists who truly listens with immense patience.",
    ownerResponse: "Thank you so much for such kind words and in-depth feedback, Anshuman! Reviews like this are fuel!",
  },
  {
    id: "review-4",
    author: "Ritu Patel",
    rating: 5,
    date: "4 months ago",
    badge: "Verified Patient",
    text: "Dr. Bhoomi is knowledgeable, patient and witty. Have had 2 sessions with her and she’s helped me find ways to deal with my anxiety and self image issues ❤️❤️",
    ownerResponse: "Thank you for the kind words! Not to forget your active participation in the process.",
  },
  {
    id: "review-5",
    author: "Priya Adesara",
    rating: 5,
    date: "4 months ago",
    badge: "Verified Patient",
    text: "Dr. Bhoomi Raval ma'am is incredibly kind and attentive. She listened carefully, answered all my questions, and made me feel at ease throughout my visit. I never felt rushed. Thank you so much ma'am.",
    ownerResponse: "Thank you so much for your review... this inspires us to help better!",
  },
  {
    id: "review-6",
    author: "Rushikesh Chhatbar",
    rating: 5,
    date: "4 months ago",
    badge: "Verified Patient",
    text: "Dr. Bhoomiben is not only an experienced psychiatrist, but she also has a very good and simple temperament, which is rarely seen in the confluence. Bhumi ben is dedicated to her work and provides quality care...",
  },
  {
    id: "review-7",
    author: "Hitali Dhagia",
    rating: 5,
    date: "4 months ago",
    badge: "Verified Patient",
    text: "I started my journey with Dr. Bhoomi Raval during a time when I was really struggling internally and didn’t fully understand what I was going through. Opening up wasn’t easy for me at all, but from the very first few sessions, I felt a deep sense of safety, warmth and understanding.",
  },
  {
    id: "review-8",
    author: "Steffi Christian",
    rating: 5,
    date: "4 months ago",
    badge: "Verified Patient",
    text: "Dr. Bhoomi is incredibly knowledgeable. From the first session, I felt completely heard and validated. She truly takes the time to listen to my concerns rather than just rushing to write a prescription. It’s rare to find a psychiatrist with such genuine empathy.",
  },
];
