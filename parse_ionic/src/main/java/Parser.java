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
        File input = new File(projectPath + "\\" + filePath);

        if (input.isFile() && input.getName().endsWith(".html")) {
            parseButtons(input);
        }
    }

    private static void parseButtons(File input) {
        Document doc;

        try{
            doc = Jsoup.parse(input, "UTF-8", "");

            Elements buttons = doc.select("button");

            for (Element button : buttons){
                // Ionic 3 button
                System.out.println(button.toString());
                // Ionic 4 button
                Element v4Button = new Element("ion-button");
                for (Attribute attribute : button.attributes()) {
                    if (!attribute.toString().equals("ion-button")) {
                        if (attribute.toString().equals("clear")) {
                            v4Button.attr("fill", "clear");
                        } else {
                            v4Button.attr(attribute.getKey(), attribute.getValue());
                        }
                    }
                }
                System.out.println(v4Button.toString() + "\n");
                button.replaceWith(v4Button);
            }

            System.out.println(doc.toString());

//            FileOutputStream is = new FileOutputStream(input);
//            OutputStreamWriter osw = new OutputStreamWriter(is);
//            Writer w = new BufferedWriter(osw);
//            w.write(doc.toString());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
