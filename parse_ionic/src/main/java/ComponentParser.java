import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ComponentParser {

    // For testing purposes
    public static void main(String[] args) {

        String projectPath = "C:\\Users\\rbngu\\OneDrive\\Desktop\\MeetupsForPetsIONIC\\PetsMeetupsV3";
        String filePath = "\\src\\pages\\add-pet\\add-pet.ts";

        ComponentParser testParser = new ComponentParser();

        System.out.println(testParser.migrateIonViewDidLoad(projectPath, filePath));
        System.out.println(testParser.migrateIonicPageAnnotation(projectPath, filePath));
        System.out.println(testParser.migrateIonicAngularImports(projectPath, filePath));
    }

    public String migrateIonViewDidLoad(String projectPath, String filePath){
        String newVersion = "";
        try{
            newVersion = new String(Files.readAllBytes(Paths.get(projectPath + filePath)));
            if(newVersion.contains("ionViewDidLoad()")){
                newVersion = newVersion.replaceAll("ionViewDidLoad","ngOnInit");
            }
            return newVersion;
        }catch(IOException e){
            System.out.println(e);
        }
        return "";
    }

    public String migrateIonicPageAnnotation(String projectPath, String filePath){
        String newVersion = "";
        try{
            newVersion = new String(Files.readAllBytes(Paths.get(projectPath + filePath)));
            if(newVersion.contains("@IonicPage()")){
                newVersion = newVersion.replaceAll("@IonicPage\\(\\)","");
            }
            return newVersion;
        }catch(IOException e){
            System.out.println(e);
        }
        return "";
    }


    public String migrateIonicAngularImports(String projectPath, String filePath){
        String newVersion = "";
        try{
            newVersion = new String(Files.readAllBytes(Paths.get(projectPath + filePath)));
            if(newVersion.contains("ionic-angular")){
                newVersion = newVersion.replaceAll("ionic-angular","@ionic/angular");
            }
            return newVersion;
        }catch(IOException e){
            System.out.println(e);
        }
        return "";
    }

}
