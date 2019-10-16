import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ComponentParser {

    // For testing purposes
    public static void main(String[] args) {

        String projectPath = "C:\\Users\\rbngu\\OneDrive\\Desktop\\MeetupsForPetsIONIC\\PetsMeetupsV3";
        String filePath = "\\src\\pages\\add-pet\\add-pet.ts";
        String servicePath = "\\src\\providers\\db\\db.ts";
        ComponentParser testParser = new ComponentParser();

        //System.out.println(testParser.migrateIonViewDidLoad(projectPath, filePath));
        //System.out.println(testParser.migrateIonicPageAnnotation(projectPath, filePath));
        //System.out.println(testParser.migrateIonicAngularImports(projectPath, filePath));
        System.out.println(testParser.migrateInjectable(projectPath, servicePath));
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

    public String migrateInjectable(String projectPath, String filePath){
        try{
            String newVersion = new String(Files.readAllBytes(Paths.get(projectPath + filePath)));
            if(newVersion.contains("@Injectable()")){
                // Finds where the '(' starts in the Injectable annotation
                int startingBracket = newVersion.indexOf("@Injectable()") + 12;

                // Make the change to have the providedIn value
                newVersion = newVersion.substring(0, startingBracket) + "{\n\t providedIn: 'root'\n}" + newVersion.substring(startingBracket);
            }
            return newVersion;
        }catch(IOException e){
            System.out.println(e);
        }
        return "";
    }

}
