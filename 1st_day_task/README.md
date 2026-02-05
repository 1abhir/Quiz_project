Day 1 Task — Online Quiz Platform System Design

1.  Overview: Online Quiz Platform allows users to attempt quizzes,
    track performance, maintain learning streaks, and enables admin to
    manage quizzes, questions, and users.

2.  Actors: User (Student):

-   Register/Login
-   Attempt quizzes
-   View results & history
-   Track learning streak

Admin: - Manage quizzes & categories - Add/edit questions - Monitor
users & analytics

3.  Functional Requirements: Authentication:

-   User signup/login/logout
-   Secure password handling
-   Role-based access

Quiz Management: - Create quiz categories - Add/update questions -
Random question selection

Quiz Attempt: - Select category - Attempt quiz - Auto evaluation

Results & Analytics: - Score calculation - Performance dashboard -
History tracking

Streak Tracking: - Daily activity tracking - Streak visualization

4.  Non-Functional Requirements: Performance: Fast response (<2 sec)
    Security: Encryption & secure login Scalability: Support growing
    users Usability: Simple responsive UI Reliability: Backup & uptime
    support

5.  System Architecture: Frontend: HTML/CSS/JS or React Backend: Django
    or Node.js APIs Database: MySQL/PostgreSQL

6.  Database Entities: Users (user_id, name, email, role) Categories
    (category_id, name) Questions (question_id, text, category_id)
    Answers (answer_id, correct flag) Attempts (attempt_id, score, date)

7.  Future Enhancements:

-   AI quiz recommendations
-   Leaderboards
-   Mobile app support
-   Adaptive quizzes

Conclusion: The platform provides an interactive learning environment
with scalable architecture, performance tracking, and efficient quiz
management.

