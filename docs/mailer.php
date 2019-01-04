<?php
    if(isset($_POST['feedback'])) {
        $email_to = "angingen@yahoo.com";
        $email_subject = "Feedback received from online-pte-timer";
        function died($error) {
            // your error code can go here
            echo "We are very sorry, but there were error(s) found with the form you submitted. ";
            echo "These errors appear below.<br /><br />";
            echo $error."<br /><br />";
            echo "Please go back and fix these errors.<br /><br />";
            die();
        }

         // validation expected data exists
        if(!isset($_POST['name']) ||
            !isset($_POST['feedback'])) {
            died('We are sorry, but there appears to be a problem with the form you submitted.');       
        }

        $name = $_POST['name']; // required
        $email = $_POST['email']; // required
        $feedback = $_POST['feedback']; // required

        if(strlen($comments) < 2) {
        $error_message .= 'The Comments you entered do not appear to be valid.<br />';
        }

        if(strlen($error_message) > 0) {
        died($error_message);
        }

        $email_message = "Form details below.\n\n";

         
        function clean_string($string) {
          $bad = array("content-type","bcc:","to:","cc:","href");
          return str_replace($bad,"",$string);
        }

         

        $email_message .= "Name: ".clean_string($name)."\n";
        $email_message .= "Email: ".clean_string($email)."\n";
        $email_message .= "Feedback: ".clean_string($feedback)."\n";

        // create email headers
        $headers = 'From: '.$email."\r\n".
        'Reply-To: '.$email."\r\n" .
        'X-Mailer: PHP/' . phpversion();
        @mail($email_to, $email_subject, $email_message, $headers);  
        ?>

        <!-- include your own success html here -->
        Thank you for contacting us. We will be in touch with you very soon.
    }
?>