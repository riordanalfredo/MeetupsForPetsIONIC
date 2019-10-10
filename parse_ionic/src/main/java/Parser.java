import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.*;

public class Parser {

    private static String projectPath;
    private static String filePath;

    public static void main(String[] args) {
        projectPath = "D:\\MeetupsForPetsIONIC-master\\PetsMeetupsV3";
        filePath = "src\\pages\\add-pet\\add-pet.html";
        // Get a file handle for the html file
        File input = new File(projectPath + "\\" + filePath);
        // Only parse if file is html
        if (input.isFile() && input.getName().endsWith(".html")) {
            parseButtons(input);
        }
    }

    private static void parseButtons(File input) {
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
            }
            // The new DOM structure can be given to the model
            // to be generated using Acceleo
            System.out.println(doc.toString());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
