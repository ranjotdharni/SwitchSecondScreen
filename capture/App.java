import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;

public class App {
    public static void main(String[] args) {
        System.out.println("Process start...");
        while(true)
        {
            try {
               // Capture the desktop screenshot
               Robot robot = new Robot();
               Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
               Rectangle screenRect = new Rectangle(screenSize);
               BufferedImage screenshot = robot.createScreenCapture(screenRect);

               // Save the screenshot as a JPEG file
               File outputFile = new File("C:\\Users\\xxtri\\Downloads\\CS Expos\\SwitchSecondScreen\\desktop\\img\\test.jpg");
               ImageIO.write(screenshot, "jpg", outputFile);
               
            } catch (AWTException | IOException ex) {
               System.err.println("Error capturing desktop screenshot: " + ex.getMessage());
            }
        }
    }
}