import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.w3c.dom.Attr;

import java.io.*;
import java.nio.file.*;

public class Parser {

    private static String projectPath;
    private static String filePath;
    private static String oldDirectory;
    private static String newDirectory;

    public static void main(String[] args) {
        // get current working space directory
        String currentPath = System.getProperty("user.dir");
        Path projectPathString = Paths.get(currentPath).getParent();

        // initialise all paths
        projectPath = projectPathString.toString() ;
        filePath = "src\\pages\\add-pet\\add-pet.html";
        oldDirectory = "PetsMeetupsV3";
        newDirectory = "PetsMeetupsV4"; // target directory
        System.out.println(projectPathString);

        // TODO: make this input variable mutable!
        File input = new File(projectPath + "\\"+  oldDirectory + "\\" + filePath);

        // Only parse if file is html
        if (input.isFile() && input.getName().endsWith(".html")) {
            //
            // parse button tags
            //
            String buttonsv4 = migrateButtons(projectPath, filePath);
            System.out.println(buttonsv4);
            //
            // parse navbar tags
            //
            String fileV4Navbar = parseNavbar(input);
            System.out.println(fileV4Navbar);

            /*
             * It seems that the `input` variable here is not modified after calling
             * `parseButtons` function.
             * TODO: Need to find a way to handle running multiple various functions
             * to generate a final result of from a single `input` variable.
             */

            /*
             * TODO: Proposed solution to using multiple parse fucntions
             *  Instead of having each function use a separate Input variable,
             *  use a common one. Isolate the parts of the code that deal with specific
             *  components into functions like migrateButtons, etc. Have the parse function
             *  call the other methods in sequence.
             */
        }
    }

    private static String migrateLabel(String projectPath, String filePath) {
        oldDirectory = "PetsMeetupsV3";
        // TODO: make this input variable mutable!
        File input = new File(projectPath + "\\"+  oldDirectory + "\\" + filePath);

        Document doc;

        try {
            doc = Jsoup.parse(input, "UTF-8", "");
            Elements labels = doc.select("ion-label");

            for (Element label: labels) {
                Element v4Label = new Element("ion-label");
                for (Attribute attribute: label.attributes()) {
                    if (!attribute.toString().equals("ion-label")) {
                        if (attribute.toString().equals("floating")) {
                            v4Label.attr("position", "floating");
                        } else {
                            v4Label.attr(attribute.getKey(), attribute.getValue());
                        }
                    }
                }

                label.replaceWith(v4Label);
                String labelText = label.text();
                v4Label.append(labelText);
            }

            return doc.toString();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    private static String migrateButtons(String projectPath, String filePath) {
        oldDirectory = "PetsMeetupsV3";
        // TODO: make this input variable mutable!
        File input = new File(projectPath + "\\"+  oldDirectory + "\\" + filePath);
        // DOM structure of the file
        Document doc;
        try{
            doc = Jsoup.parse(input, "UTF-8", "");
            // Select all buttons
            Elements buttons = doc.select("button");

            for (Element button : buttons){
                // Ionic 3 button
                System.out.println(button.toString());
                // Ionic 4 button
                Element v4Button = new Element("ion-button");
                // Loop through all attributes of v3 button
                for (Attribute attribute : button.attributes()) {
                    // We only want to change ion-buttons, not regular ones
                    if (!attribute.toString().equals("ion-button")) {
                        // Change attributes from v3 to v4 according to docs
                        // Any that don't change can just have the old key and value
                        // from the v3 button
                        if (attribute.toString().equals("clear")) {
                            v4Button.attr("fill", "clear");
                        } else {
                            v4Button.attr(attribute.getKey(), attribute.getValue());
                        }
                    }
                }
                System.out.println(v4Button.toString() + "\n");
                // Replace the old button with the new button in the DOM structure
                button.replaceWith(v4Button);

                // Adding children / text
                String v3ButtonText = button.text();
                System.out.println("v3 button children: " + v3ButtonText);
                v4Button.append(v3ButtonText);
            }
            // The new DOM structure can be given to the model
            // to be generated using Acceleo
            System.out.println(doc.toString());
            return doc.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "";
    }

    private static String parseNavbar(File f){
        // DOM structure of the file
        Document doc;
        try {
            doc = Jsoup.parse(f, "UTF-8", "");
            // Select all navbar
            Elements navbars = doc.select("ion-navbar");
            for (Element v3Navbar : navbars) {
                Element v4Navbar = new Element("ion-toolbar");

                //Loop through old tag attributes to get all attributes
                for (Attribute attribute : v3Navbar.attributes()) {
                    v4Navbar.attr(attribute.getKey(), attribute.getValue());
                }

                // Replace old tags with new tags
                v3Navbar.replaceWith(v4Navbar);

                // Adding children into new tags
                Elements v3NavbarChildren = v3Navbar.children();
                for( Element v3Child : v3NavbarChildren){
                    v4Navbar.appendChild(v3Child);
                }
            }
            return doc.toString();
        }
        catch (IOException e){
            e.printStackTrace();
        }
        return "error in parsing Navbar";
    }
}
